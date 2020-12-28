<script>
	import { Button } from 'sveltestrap';
	const handleClick = () => alert('I warned you!');
</script>

<style>
/* put styles here */
</style>

<!-- <div>asdf</div> -->
<Button color="danger" on:click={handleClick}>Do Not Press</Button>