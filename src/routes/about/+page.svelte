<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import Content from './Content.svelte.md';
</script>

<ArticleLayout breadcrumbs={[{ href: '/', label: 'ffloyd.space' }]}>
  <Content />
</ArticleLayout>
