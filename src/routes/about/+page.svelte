<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import Content from './Content.svx';
</script>

<ArticleLayout breadcrumbs={[{ href: '/', label: 'ffloyd.space' }]}>
  <Content />
</ArticleLayout>
