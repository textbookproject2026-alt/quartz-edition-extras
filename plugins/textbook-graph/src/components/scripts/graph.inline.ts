// @ts-nocheck
/*
 * Textbook fork of quartz-community/graph's script (upstream commit in
 * CHANGELOG.md). What differs, and why:
 *
 *   - Nodes are coloured by TOPIC (src/topics.ts works out each page's slot
 *     at build time and the component writes it to data-topics). Colour used
 *     to mean current/visited/tag; now the current page is a dark ring and the
 *     visited colour is gone, so colour means one thing only.
 *   - Labels are always on, at a constant screen size. A greedy pass puts
 *     each label above, below, right or left of its node, wherever it clears
 *     the other labels and dots, and hides it only when none does; the
 *     most-linked pages are placed first (a highlighted
 *     topic's pages before the rest); the current page and the hovered node
 *     and its neighbours always keep theirs. Long titles are shortened, and
 *     shown in full on hover.
 *   - A legend under the graph names each topic's colour. Choosing a topic
 *     highlights its pages; choosing it again clears the highlight.
 *
 * Everything else (data, forces, drag, zoom, the global graph) is upstream's.
 */
import {
  removeAllChildren,
  getBasePath,
  getFullSlugFromUrl,
  simplifySlug,
  resolveBasePath,
} from "@quartz-community/utils";

(function () {
  function getSlugFromUrl() {
    var slug = getFullSlugFromUrl();
    var base = getBasePath();
    if (base && slug.startsWith(base.replace(/^\//, ""))) {
      slug = slug.slice(base.replace(/^\//, "").length);
      if (slug.startsWith("/")) slug = slug.slice(1);
    }
    return slug;
  }

  function loadScript(src) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.crossOrigin = "anonymous";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  Promise.all([
    loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"),
    loadScript("https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.js"),
  ])
    .then(function () {
      initGraph();
    })
    .catch(function (err) {
      console.error("[Graph] Failed to load libraries:", err);
      var containers = document.querySelectorAll(".graph-container");
      for (var i = 0; i < containers.length; i++) {
        containers[i].textContent = "Graph could not load. Check your network connection.";
        containers[i].style.display = "flex";
        containers[i].style.alignItems = "center";
        containers[i].style.justifyContent = "center";
        containers[i].style.color = "var(--gray)";
        containers[i].style.fontSize = "0.9rem";
      }
    });

  // Titles past this many characters are cut to it (with "…") until hovered.
  var LABEL_MAX = 28;
  // How many topic colours graph.scss defines (--tb-topic-1 … -8). Mirrors
  // TOPIC_SLOTS in src/topics.ts.
  var TOPIC_SLOTS = 8;

  function shorten(text) {
    return text.length > LABEL_MAX ? text.slice(0, LABEL_MAX - 1).trimEnd() + "…" : text;
  }

  function initGraph() {
    var d3 = window.d3;
    var PIXI = window.PIXI;

    if (!d3 || !PIXI) {
      console.error("[Graph] Libraries not loaded");
      return;
    }

    // Resolves CSS color values containing calc()/var() that PixiJS cannot parse.
    // Uses a temp DOM element so the browser's CSS engine evaluates the expression.
    function resolveColor(value, fallback) {
      if (!value) return fallback;
      var el = document.createElement("div");
      el.style.color = value;
      el.style.position = "absolute";
      el.style.visibility = "hidden";
      document.body.appendChild(el);
      var resolved = getComputedStyle(el).color;
      el.remove();
      return resolved || fallback;
    }

    /** { topics: [label…], pages: Map(simple slug -> slot) } from the component's data-topics. */
    function readTopics(graph) {
      var root = graph.closest(".graph");
      var raw = { topics: [], pages: {} };
      try {
        raw = JSON.parse((root && root.dataset.topics) || "{}");
      } catch (_) {
        // A page without topics still draws, all in the "Other" colour.
      }
      var pages = new Map();
      for (var s in raw.pages || {}) pages.set(simplifySlug(s), raw.pages[s]);
      return { topics: Array.isArray(raw.topics) ? raw.topics : [], pages: pages };
    }

    async function renderGraph(graph, fullSlug, renderGeneration, legendEl) {
      var slug = simplifySlug(fullSlug);
      if (slug === "") slug = "index";
      removeAllChildren(graph);

      if (renderGeneration !== undefined && renderGeneration !== currentRenderGeneration) {
        return function () {};
      }

      var config = JSON.parse(graph.dataset["cfg"] || "{}");
      var enableDrag = config.drag;
      var enableZoom = config.zoom;
      var depth = config.depth;
      var repelForce = config.repelForce || 0.5;
      var centerForce = config.centerForce || 0.3;
      var linkDistance = config.linkDistance || 30;
      var fontSize = config.fontSize || 0.6;
      var removeTags = config.removeTags || [];
      var showTags = config.showTags;
      var focusOnHover = config.focusOnHover;
      var enableRadial = config.enableRadial;
      var topicData = readTopics(graph);

      var data;
      try {
        var dataRaw = await fetchData;
        data = new Map();
        for (var key in dataRaw) {
          data.set(simplifySlug(key), dataRaw[key]);
        }
      } catch (err) {
        console.error("[Graph] Error loading data:", err);
        return function () {};
      }

      var width = graph.offsetWidth;
      var height = Math.max(graph.offsetHeight, 250);

      var links = [];
      var allTags = [];
      var validLinks = new Set(data.keys());

      data.forEach(function (details, source) {
        var outgoing = details.links || [];
        for (var i = 0; i < outgoing.length; i++) {
          var dest = simplifySlug(outgoing[i]);
          if (validLinks.has(dest)) {
            links.push({ source: source, target: dest });
          }
        }

        if (showTags) {
          var tags = details.tags || [];
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (removeTags.indexOf(tag) === -1) {
              var tagSlug = simplifySlug("tags/" + tag);
              if (allTags.indexOf(tagSlug) === -1) {
                allTags.push(tagSlug);
              }
              links.push({ source: source, target: tagSlug });
            }
          }
        }
      });

      var neighbourhood = new Set();
      if (depth >= 0) {
        var queue = [slug];
        var seen = new Set([slug]);
        for (var d = 0; d <= depth && queue.length > 0; d++) {
          var nextQueue = [];
          for (var qi = 0; qi < queue.length; qi++) {
            var cur = queue[qi];
            neighbourhood.add(cur);
            for (var li = 0; li < links.length; li++) {
              var link = links[li];
              if (link.source === cur && !seen.has(link.target)) {
                seen.add(link.target);
                nextQueue.push(link.target);
              }
              if (link.target === cur && !seen.has(link.source)) {
                seen.add(link.source);
                nextQueue.push(link.source);
              }
            }
          }
          queue = nextQueue;
        }
      } else {
        validLinks.forEach(function (id) {
          neighbourhood.add(id);
        });
        for (var i = 0; i < allTags.length; i++) {
          neighbourhood.add(allTags[i]);
        }
      }

      var nodes = [];
      var nodeMap = new Map();
      neighbourhood.forEach(function (url) {
        var isTag = url.startsWith("tags/");
        var text = isTag ? "#" + url.substring(5) : data.get(url)?.title || url;
        var slot = isTag ? undefined : topicData.pages.get(url);
        var node = {
          id: url,
          text: text,
          isTag: isTag,
          // -1: a page in the "Other" colour. null: a tag, which has no topic.
          topic: isTag ? null : slot === undefined ? -1 : slot,
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          vx: 0,
          vy: 0,
        };
        nodes.push(node);
        nodeMap.set(url, node);
      });

      var graphLinks = [];
      var degree = new Map();
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (neighbourhood.has(link.source) && neighbourhood.has(link.target)) {
          var sourceNode = nodeMap.get(link.source);
          var targetNode = nodeMap.get(link.target);
          if (sourceNode && targetNode) {
            graphLinks.push({ source: sourceNode, target: targetNode });
            degree.set(link.source, (degree.get(link.source) || 0) + 1);
            degree.set(link.target, (degree.get(link.target) || 0) + 1);
          }
        }
      }

      var styles = getComputedStyle(document.documentElement);
      var cssColor = function (name, fallback) {
        return resolveColor(styles.getPropertyValue(name).trim(), fallback);
      };
      var gray = cssColor("--gray", "#9b9ba1");
      var lightgray = cssColor("--lightgray", "#e6e6e6");
      var dark = cssColor("--dark", "#2b2b2b");
      var light = cssColor("--light", "#ffffff");
      var other = cssColor("--tb-topic-other", gray);
      var palette = [];
      for (var i = 1; i <= TOPIC_SLOTS; i++) palette.push(cssColor("--tb-topic-" + i, gray));
      var bodyFont = styles.getPropertyValue("--bodyFont").trim() || "inherit";

      function topicColor(topic) {
        return topic >= 0 && topic < palette.length ? palette[topic] : other;
      }

      var app = new PIXI.Application();
      await app.init({
        width: width,
        height: height,
        antialias: true,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        eventMode: "static",
      });

      graph.appendChild(app.canvas);

      var stage = new PIXI.Container();
      app.stage.addChild(stage);

      function nodeRadius(d) {
        return 2 + Math.sqrt(degree.get(d.id) || 0) + (d.id === slug ? 1.5 : 0);
      }

      var simulation = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-100 * repelForce))
        .force("center", d3.forceCenter().strength(centerForce))
        .force("link", d3.forceLink(graphLinks).distance(linkDistance))
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(function (d) {
              return nodeRadius(d);
            })
            .iterations(3),
        );

      if (enableRadial) {
        var radius = (Math.min(width, height) / 2) * 0.8;
        simulation.force("radial", d3.forceRadial(radius).strength(0.2));
      }

      var linkContainer = new PIXI.Container();
      var nodesContainer = new PIXI.Container();
      var labelsContainer = new PIXI.Container();
      stage.addChild(linkContainer);
      stage.addChild(nodesContainer);
      stage.addChild(labelsContainer);

      var nodeRenderData = [];
      var linkRenderData = [];
      var hoveredNodeId = null;
      var focusTopic = null; // a legend slot, or -1 for "Other"
      var dragStartTime = 0;
      var dragging = false;
      var currentTransform = d3.zoomIdentity;
      var labelsDirty = true;

      function updateHoverInfo(newHoveredId) {
        hoveredNodeId = newHoveredId;
        var near = new Set();
        for (var i = 0; i < linkRenderData.length; i++) {
          var l = linkRenderData[i].simulationData;
          var on =
            newHoveredId !== null && (l.source.id === newHoveredId || l.target.id === newHoveredId);
          linkRenderData[i].active = on;
          if (on) {
            near.add(l.source.id);
            near.add(l.target.id);
          }
        }
        if (newHoveredId !== null) near.add(newHoveredId);
        for (var i = 0; i < nodeRenderData.length; i++) {
          nodeRenderData[i].active = near.has(nodeRenderData[i].simulationData.id);
        }
        labelsDirty = true;
      }

      function inFocus(n) {
        return focusTopic === null || n.topic === focusTopic;
      }

      function renderLinks() {
        for (var i = 0; i < linkRenderData.length; i++) {
          var linkData = linkRenderData[i];
          var l = linkData.simulationData;
          var alpha = 1;
          if (hoveredNodeId !== null) alpha = linkData.active ? 1 : 0.2;
          else if (focusTopic !== null) alpha = inFocus(l.source) && inFocus(l.target) ? 1 : 0.15;
          linkData.alpha = alpha;
          linkData.color = linkData.active ? gray : lightgray;
        }
      }

      function renderNodes() {
        for (var i = 0; i < nodeRenderData.length; i++) {
          var nodeData = nodeRenderData[i];
          var n = nodeData.simulationData;
          var alpha = 1;
          if (hoveredNodeId !== null && focusOnHover) alpha = nodeData.active ? 1 : 0.2;
          else if (focusTopic !== null && !n.isTag) alpha = inFocus(n) ? 1 : 0.2;
          nodeData.gfx.alpha = alpha;
        }
      }

      function setLabelText(nodeData, full) {
        var want = full ? nodeData.simulationData.text : nodeData.shortText;
        if (nodeData.label.text === want) return;
        nodeData.label.text = want;
        nodeData.labelW = nodeData.label.width / nodeData.label.scale.x;
      }

      function renderPixiFromD3() {
        renderNodes();
        renderLinks();
        labelsDirty = true;
      }

      // Where a label may sit, tried in this order: above its node, below,
      // right, left. [anchor x, anchor y, offset x, offset y] in units of
      // (node radius + gap); the anchor is PIXI's.
      var SPOTS = [
        [0.5, 1, 0, -1],
        [0.5, 0, 0, 1],
        [0, 0.5, 1, 0],
        [1, 0.5, -1, 0],
      ];

      function spotBox(nd, sx, sy, r, spot) {
        var s = SPOTS[spot];
        var w = nd.labelW + 4;
        var h = nd.labelH;
        var ax = sx + s[2] * (r + 4);
        var ay = sy + s[3] * (r + 3);
        return { x: ax - s[0] * w, y: ay - s[1] * h, w: w, h: h };
      }

      function overlaps(box, list) {
        for (var j = 0; j < list.length; j++) {
          var p = list[j];
          if (box.x < p.x + p.w && p.x < box.x + box.w && box.y < p.y + p.h && p.y < box.y + box.h)
            return true;
        }
        return false;
      }

      // Which labels show, and where. Screen-space boxes, placed in priority
      // order: each label takes the first of its four spots that clears every
      // label already placed and every other node's dot (its last spot is
      // tried first, so labels don't hop about while the layout settles). A
      // label with no clear spot hides, unless it must show. Runs when the
      // view changes, not every frame.
      function placeLabels() {
        var k = currentTransform.k;
        var tx = currentTransform.x;
        var ty = currentTransform.y;
        var order = nodeRenderData.slice().sort(function (a, b) {
          return b.priority() - a.priority();
        });
        var dots = [];
        for (var i = 0; i < nodeRenderData.length; i++) {
          var m = nodeRenderData[i].simulationData;
          if (m.x == null) continue;
          var mr = nodeRadius(m) * k;
          var mx = (m.x + width / 2) * k + tx;
          var my = (m.y + height / 2) * k + ty;
          dots.push({ id: m.id, box: { x: mx - mr, y: my - mr, w: 2 * mr, h: 2 * mr } });
        }
        var placed = [];
        for (var i = 0; i < order.length; i++) {
          var nd = order[i];
          var n = nd.simulationData;
          if (n.x == null) continue;
          // Only the current page and the hovered neighbourhood may overlap.
          var must = n.id === slug || nd.active;
          var hiddenByFocus = focusTopic !== null && !must && (n.isTag || !inFocus(n));
          var sx = (n.x + width / 2) * k + tx;
          var sy = (n.y + height / 2) * k + ty;
          var r = nodeRadius(n) * k;
          var others = dots.filter(function (d) {
            return d.id !== n.id;
          }).map(function (d) {
            return d.box;
          });
          var tries = [nd.labelSpot];
          for (var t = 0; t < SPOTS.length; t++) if (t !== nd.labelSpot) tries.push(t);
          var chosen = -1;
          var box = null;
          if (!hiddenByFocus) {
            for (var t = 0; t < tries.length; t++) {
              var b = spotBox(nd, sx, sy, r, tries[t]);
              var offscreen = b.x < 0 || b.x + b.w > width || b.y < 0 || b.y + b.h > height;
              if (!offscreen && !overlaps(b, placed) && !overlaps(b, others)) {
                chosen = tries[t];
                box = b;
                break;
              }
            }
            if (chosen < 0 && must) {
              chosen = nd.labelSpot;
              box = spotBox(nd, sx, sy, r, chosen);
            }
          }
          if (chosen >= 0) {
            placed.push(box);
            if (chosen !== nd.labelSpot) {
              nd.labelSpot = chosen;
              nd.label.anchor.set(SPOTS[chosen][0], SPOTS[chosen][1]);
            }
          }
          nd.labelTarget = chosen >= 0 ? 1 : 0;
        }
        labelsDirty = false;
      }

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeId = node.id;
        var radius = nodeRadius(node);
        var isCurrent = nodeId === slug;

        var label = new PIXI.Text({
          text: shorten(node.text),
          style: {
            fontSize: fontSize * 20,
            fontWeight: isCurrent ? "600" : "400",
            fill: node.isTag ? gray : dark,
            fontFamily: bodyFont,
            // A halo in the background colour keeps a label legible over links.
            stroke: { color: light, width: 3, join: "round" },
          },
          resolution: (window.devicePixelRatio || 1) * 2,
        });
        label.anchor.set(0.5, 1);
        label.alpha = 0;
        labelsContainer.addChild(label);

        var gfx = new PIXI.Graphics();
        gfx.circle(0, 0, radius);
        if (node.isTag) {
          gfx.fill({ color: light });
          gfx.stroke({ width: 1.5, color: gray });
        } else {
          gfx.fill({ color: topicColor(node.topic) });
          if (isCurrent) gfx.stroke({ width: 2, color: dark });
        }

        gfx.eventMode = "static";
        gfx.cursor = "pointer";
        gfx.label = nodeId;

        var nodeData = {
          simulationData: node,
          gfx: gfx,
          label: label,
          shortText: shorten(node.text),
          labelW: label.width,
          labelH: label.height,
          labelTarget: 0,
          labelSpot: 0,
          alpha: 1,
          active: false,
          priority: null,
        };
        nodeData.priority = (function (nd, n) {
          var base = (degree.get(n.id) || 0) - (n.isTag ? 0.5 : 0);
          return function () {
            if (n.id === slug) return 1e9;
            if (nd.active) return 1e8 + base;
            // A highlighted topic's pages are placed before everything else.
            if (focusTopic !== null && !n.isTag && n.topic === focusTopic) return 1e7 + base;
            return base;
          };
        })(nodeData, node);

        (function (n, g, nd) {
          g.on("pointerover", function () {
            updateHoverInfo(n.id);
            setLabelText(nd, true);
            if (!dragging) renderPixiFromD3();
          });
          g.on("pointerleave", function () {
            updateHoverInfo(null);
            setLabelText(nd, false);
            if (!dragging) renderPixiFromD3();
          });
        })(node, gfx, nodeData);

        nodesContainer.addChild(gfx);
        nodeRenderData.push(nodeData);
      }

      for (var i = 0; i < graphLinks.length; i++) {
        var link = graphLinks[i];
        var gfx = new PIXI.Graphics();
        gfx.eventMode = "none";
        linkContainer.addChild(gfx);

        linkRenderData.push({
          simulationData: link,
          gfx: gfx,
          color: lightgray,
          alpha: 1,
          active: false,
        });
      }

      // The legend: one entry per topic present in this graph, in slot order.
      if (legendEl) {
        removeAllChildren(legendEl);
        var present = new Map();
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].isTag) continue;
          present.set(nodes[i].topic, (present.get(nodes[i].topic) || 0) + 1);
        }
        var slots = Array.from(present.keys()).sort(function (a, b) {
          return (a < 0 ? 99 : a) - (b < 0 ? 99 : b);
        });
        // All grey is no information: no legend until at least one topic shows.
        var anyTopic = slots.some(function (s) {
          return s >= 0;
        });
        legendEl.hidden = !anyTopic;
        if (anyTopic) {
          var buttons = [];
          slots.forEach(function (s) {
            var li = document.createElement("li");
            var b = document.createElement("button");
            b.type = "button";
            b.setAttribute("aria-pressed", "false");
            b.title = "Highlight these pages";
            var sw = document.createElement("span");
            sw.className = "graph-legend-swatch";
            sw.style.background = topicColor(s);
            b.append(sw, document.createTextNode(s < 0 ? "Other" : topicData.topics[s]));
            b.addEventListener("click", function (ev) {
              ev.stopPropagation(); // the global graph closes on a click it doesn't own
              focusTopic = focusTopic === s ? null : s;
              buttons.forEach(function (x) {
                x.setAttribute("aria-pressed", String(focusTopic !== null && x === b));
              });
              renderPixiFromD3();
            });
            buttons.push(b);
            li.append(b);
            legendEl.append(li);
          });
        }
      }

      if (enableDrag) {
        var dragSubject = function (event) {
          var mouseX = (event.x - currentTransform.x) / currentTransform.k;
          var mouseY = (event.y - currentTransform.y) / currentTransform.k;

          for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            var dx = mouseX - n.x - width / 2;
            var dy = mouseY - n.y - height / 2;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var rad = nodeRadius(n);
            if (dist < rad + 5) {
              return n;
            }
          }
          return null;
        };

        var dragStarted = function (event) {
          if (!event.active) simulation.alphaTarget(1).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
          var mouseSimX = (event.x - currentTransform.x) / currentTransform.k - width / 2;
          var mouseSimY = (event.y - currentTransform.y) / currentTransform.k - height / 2;
          event.subject.__dragOffset = {
            x: mouseSimX - event.subject.x,
            y: mouseSimY - event.subject.y,
          };
          dragStartTime = Date.now();
          dragging = true;
          hoveredNodeId = event.subject.id;
        };

        var dragDragged = function (event) {
          var mouseSimX = (event.x - currentTransform.x) / currentTransform.k - width / 2;
          var mouseSimY = (event.y - currentTransform.y) / currentTransform.k - height / 2;
          event.subject.fx = mouseSimX - event.subject.__dragOffset.x;
          event.subject.fy = mouseSimY - event.subject.__dragOffset.y;
        };

        var dragEnded = function (event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
          dragging = false;
          updateHoverInfo(null);
          renderPixiFromD3();

          if (Date.now() - dragStartTime < 500) {
            var target = resolveBasePath(event.subject.id);
            window.location.href = target;
          }
        };

        var drag = d3
          .drag()
          .container(app.canvas)
          .subject(dragSubject)
          .on("start", dragStarted)
          .on("drag", dragDragged)
          .on("end", dragEnded);

        d3.select(app.canvas).call(drag);
      } else {
        for (var i = 0; i < nodeRenderData.length; i++) {
          (function (nodeData) {
            nodeData.gfx.on("click", function () {
              var target = resolveBasePath(nodeData.simulationData.id);
              window.location.href = target;
            });
          })(nodeRenderData[i]);
        }
      }

      if (enableZoom) {
        var zoomed = function (event) {
          currentTransform = event.transform;
          stage.scale.set(currentTransform.k, currentTransform.k);
          stage.position.set(currentTransform.x, currentTransform.y);
          labelsDirty = true;
        };

        var zoom = d3
          .zoom()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([0.25, 4])
          .on("zoom", zoomed);

        d3.select(app.canvas).call(zoom);
      }

      var stopAnimation = false;
      var frame = 0;
      function animate() {
        if (stopAnimation) return;
        frame++;
        var k = currentTransform.k;
        // While the layout is still moving, re-place labels every few frames.
        if (labelsDirty || (simulation.alpha() > simulation.alphaMin() && frame % 4 === 0)) {
          placeLabels();
        }

        for (var i = 0; i < nodeRenderData.length; i++) {
          var n = nodeRenderData[i];
          var x = n.simulationData.x;
          var y = n.simulationData.y;
          if (x != null && y != null) {
            n.gfx.position.set(x + width / 2, y + height / 2);
            // Constant screen size: the stage is scaled by k, the label by 1/k.
            n.label.scale.set(1 / k);
            var spot = SPOTS[n.labelSpot];
            var rr = nodeRadius(n.simulationData);
            n.label.position.set(
              x + width / 2 + spot[2] * (rr + 4 / k),
              y + height / 2 + spot[3] * (rr + 3 / k),
            );
            n.label.alpha += (n.labelTarget - n.label.alpha) * 0.35;
          }
        }

        for (var i = 0; i < linkRenderData.length; i++) {
          var l = linkRenderData[i];
          var linkData = l.simulationData;
          var sx = linkData.source.x;
          var sy = linkData.source.y;
          var tx = linkData.target.x;
          var ty = linkData.target.y;
          if (sx != null && sy != null && tx != null && ty != null) {
            l.gfx.clear();
            l.gfx.moveTo(sx + width / 2, sy + height / 2);
            l.gfx.lineTo(tx + width / 2, ty + height / 2);
            l.gfx.stroke({ alpha: l.alpha, width: 1, color: l.color });
          }
        }

        requestAnimationFrame(animate);
      }

      simulation.on("tick", function () {});
      simulation.restart();
      renderPixiFromD3();
      animate();

      return function () {
        stopAnimation = true;
        simulation.stop();
        try {
          app.destroy(true);
        } catch (_) {
          // PixiJS may throw if WebGL context was already lost.
        }
      };
    }

    var localCleanups = [];
    var globalCleanups = [];
    var currentRenderGeneration = 0;

    function cleanupLocal() {
      for (var i = 0; i < localCleanups.length; i++) {
        localCleanups[i]();
      }
      localCleanups = [];
    }

    function cleanupGlobal() {
      for (var i = 0; i < globalCleanups.length; i++) {
        globalCleanups[i]();
      }
      globalCleanups = [];
    }

    var globalContainers = [];
    var globalIcons = [];
    var documentClickHandler = null;
    var documentKeydownHandler = null;
    var iconClickHandler = null;

    function hideGlobalGraph() {
      cleanupGlobal();
      for (var i = 0; i < globalContainers.length; i++) {
        globalContainers[i].classList.remove("active");
        var sidebar = globalContainers[i].closest(".sidebar");
        if (sidebar) {
          sidebar.style.zIndex = "";
        }
      }
    }

    function anyGlobalGraphActive() {
      for (var i = 0; i < globalContainers.length; i++) {
        if (globalContainers[i].classList.contains("active")) {
          return true;
        }
      }
      return false;
    }

    function showGlobalGraph() {
      cleanupGlobal();
      var currentSlug = getSlugFromUrl();
      for (var i = 0; i < globalContainers.length; i++) {
        var container = globalContainers[i];
        container.classList.add("active");
        var sidebar = container.closest(".sidebar");
        if (sidebar) {
          sidebar.style.zIndex = "1";
        }

        var graphContainer = container.querySelector(".global-graph-container");
        if (graphContainer) {
          (function (gc) {
            renderGraph(gc, currentSlug, undefined, container.querySelector(".graph-legend"))
              .then(function (cleanup) {
                globalCleanups.push(cleanup);
              })
              .catch(function (err) {
                console.error("[Graph] Global render error:", err);
              });
          })(graphContainer);
        }
      }
    }

    function toggleGlobalGraph() {
      if (anyGlobalGraphActive()) {
        hideGlobalGraph();
      } else {
        showGlobalGraph();
      }
    }

    function renderLocal() {
      cleanupLocal();
      var thisGeneration = ++currentRenderGeneration;
      var slug = getSlugFromUrl();

      var localContainers = document.querySelectorAll(".graph-container");
      for (var i = 0; i < localContainers.length; i++) {
        (function (container) {
          var root = container.closest(".graph");
          var legend = root && root.querySelector(":scope > .graph-legend");
          renderGraph(container, slug, thisGeneration, legend)
            .then(function (cleanup) {
              if (thisGeneration === currentRenderGeneration) {
                localCleanups.push(cleanup);
              }
            })
            .catch(function (err) {
              console.error("[Graph] Local render error:", err);
            });
        })(localContainers[i]);
      }
    }

    function handleNav() {
      renderLocal();

      globalContainers = Array.from(document.querySelectorAll(".global-graph-outer"));

      if (iconClickHandler) {
        for (var i = 0; i < globalIcons.length; i++) {
          globalIcons[i].removeEventListener("click", iconClickHandler);
        }
      }

      globalIcons = Array.from(document.querySelectorAll(".global-graph-icon"));
      iconClickHandler = function () {
        toggleGlobalGraph();
      };
      for (var i = 0; i < globalIcons.length; i++) {
        globalIcons[i].addEventListener("click", iconClickHandler);
      }

      if (documentClickHandler) {
        document.removeEventListener("click", documentClickHandler);
      }
      documentClickHandler = function (e) {
        if (anyGlobalGraphActive()) {
          var inContainer = e.target.closest(".global-graph-container");
          var inIcon = e.target.closest(".global-graph-icon");
          var inLegend = e.target.closest(".graph-legend");
          if (!inContainer && !inIcon && !inLegend) {
            hideGlobalGraph();
          }
        }
      };
      document.addEventListener("click", documentClickHandler);

      if (documentKeydownHandler) {
        document.removeEventListener("keydown", documentKeydownHandler);
      }
      documentKeydownHandler = function (e) {
        if (e.key === "Escape") {
          if (anyGlobalGraphActive()) {
            hideGlobalGraph();
          }
          return;
        }

        if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
          e.preventDefault();
          toggleGlobalGraph();
        }
      };
      document.addEventListener("keydown", documentKeydownHandler);

      if (anyGlobalGraphActive()) {
        showGlobalGraph();
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        handleNav({ detail: { url: getSlugFromUrl() } });
      });
    } else {
      handleNav({ detail: { url: getSlugFromUrl() } });
    }
    document.addEventListener("prenav", function () {
      cleanupLocal();
      cleanupGlobal();
    });
    document.addEventListener("nav", handleNav);
    document.addEventListener("render", handleNav);

    function handleThemeChange() {
      renderLocal();
      if (anyGlobalGraphActive()) {
        showGlobalGraph();
      }
    }
    document.addEventListener("themechange", handleThemeChange);
  }
})();
