<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="me" href="https://mastodon.social/@ffloyd" />
  <meta name="fediverse:creator" content="@ffloyd@mastodon.social" />
</svelte:head>

{@render children()}
