<script lang="ts">
	let {
		type = 'drawer',
		isOpen = $bindable(false),
	}: {
		type?: 'landing' | 'drawer';
		isOpen?: boolean;
	} = $props();
</script>

{#if type === 'landing'}
	<h1 class="mb-4 text-center">Svelte Draggable Drawer</h1>
	<button class="button" onclick={() => (isOpen = !isOpen)}>Open drawer</button>
{/if}

{#if type === 'drawer'}
	<form class="form">
		<h2 class="col-span-2 mbe-4">Hey there! :)</h2>
		<p class="col-span-2">Wondering how this works? Here’s a quick rundown:</p>
		<ul class="col-span-2">
			<li>The form elements should work exactly like you’d expect.</li>
			<li>
				You will be able to move the drawer around by dragging from anything other than the
				interactive elements.
			</li>
			<li>If a handle is present, dragging will only be started from it.</li>
		</ul>
		<hr class="col-span-2 mb-4" />
		<div class="form-field col-span-2">
			<label for="email">Email</label>
			<input id="email" type="email" class="form-input" />
		</div>
		<div class="form-field">
			<label for="first-name">First name</label>
			<input id="first-name" type="text" class="form-input" />
		</div>
		<div class="form-field">
			<label for="last-name">Last name</label>
			<input id="last-name" type="text" class="form-input" />
		</div>
		<div class="form-field col-span-2">
			<label for="message">Message</label>
			<textarea id="message" class="form-textarea" rows="3"></textarea>
		</div>
		<button class="button col-start-2">Send it</button>
	</form>
{/if}
