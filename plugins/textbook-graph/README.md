# textbook-graph

The textbook platform's graph view: [`quartz-community/graph`](https://github.com/quartz-community/graph)
(MIT) with three changes. It replaces the community plugin in quartz-book's
`quartz.config.yaml`; options are upstream's, unchanged (`localGraph`, `globalGraph`).

1. **Nodes are coloured by topic.** A page's topic is its frontmatter `topic:`
   (a string, or the first of a list), else its first tag other than `concept`,
   else none. It is the same rule as quartz-book's catalog (`builder/lib.mjs`,
   `topicOf`), so the portal sees the same topic.

   ```yaml
   ---
   title: Emergence
   topic: Social ontology
   tags: [concept, ontology]
   ---
   ```

   The component works out every page's topic at build time from `allFiles`
   and writes `{topics, pages}` to the `.graph` element's `data-topics`; the
   content index the script fetches carries no frontmatter. The eight most-used
   topics (most pages, then A–Z) take `--tb-topic-1` … `--tb-topic-8`, in that
   order; any further topic, and a page with none, is `--tb-topic-other`. A
   ninth topic never gets an invented colour. The palette is in
   `src/components/styles/graph.scss` (validated: adjacent pairs clear the
   colour-vision and normal-vision floors; four slots are under 3:1 on white,
   which is why labels and the legend always carry the name too).

   Tags drawn as nodes stay neutral rings: a tag isn't a page, so has no topic.
   The current page is a dark ring.

2. **Labels are always on.** They stay the same size on screen whatever the
   zoom. Where two would overlap, the less-linked one hides (a highlighted
   topic's pages win over the rest); the current page, the hovered node and its
   neighbours always show. Titles over 28 characters are cut until hovered.

3. **A topic legend** under the local graph, and along the bottom edge of the
   global graph, lists the topics in view. Choosing one highlights its pages
   (the rest dim); choosing it again clears it. Hidden when nothing has a topic.

## Building

v5 plugins ship pre-built: after any change,

```
npm ci
npm run build
npm test
```

and commit `dist/` with the source.
