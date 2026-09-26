<script lang="ts">
	let {
		type = 'drawer',
		isOpen = $bindable(false),
	}: {
		type?: 'landing' | 'drawer' | 'drawer-extended';
		isOpen?: boolean;
	} = $props();
</script>

{#if type === 'landing'}
	<h1 class="mb-4 text-center">Svelte Draggable Drawer</h1>
	<button class="button" onclick={() => (isOpen = !isOpen)}>Open drawer</button>
{/if}

{#if type === 'drawer' || type === 'drawer-extended'}
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

	{#if type === 'drawer-extended'}
		<section class="faq mbs-4">
			<h2>FAQ</h2>
			<div>
				<h3>Why won't the drawer drag from this form?</h3>
				<p class="mbs-2">
					Clicking or focusing an input, textarea, button, or anything else interactive lets you use
					it normally instead of starting a drag. Grab any empty space in the drawer, or a handle if
					one is present, to move it.
				</p>
			</div>
			<div>
				<h3>
					What's the difference between <code>range</code> and <code>snapPoints</code>?
				</h3>
				<p class="mbs-2">
					<code>range</code> sets how much of the drawer stays visible at its two resting states —
					fully open and fully closed. <code>snapPoints</code> adds extra stops in between, so a drag
					can settle at a partial height rather than jumping straight from one end to the other.
				</p>
			</div>
			<div>
				<h3>Can I open or close the drawer without dragging it?</h3>
				<p class="mbs-2">
					Yes — it's bound to an <code>isOpen</code> prop, so toggling that from anywhere in your app
					opens or closes it with the same transition a drag would use.
				</p>
			</div>
			<div>
				<h3>Does it work with a keyboard?</h3>
				<p class="mbs-2">
					The drawer and its handle are focusable and respond to the keyboard, so it doesn't depend
					on pointer or touch input to be usable.
				</p>
			</div>
			<div>
				<h3>What happens if I click outside the drawer?</h3>
				<p class="mbs-2">
					Clicking the backdrop closes the drawer and clears any active snap point, the same as
					dragging it down to the closed position would.
				</p>
			</div>
			<div>
				<h3>Does it work on touch devices?</h3>
				<p class="mbs-2">
					Yes — dragging is built on pointer events, so mouse, touch, and pen input are all handled
					the same way without separate code paths.
				</p>
			</div>
			<div>
				<h3>Why does the drawer resist a little past the top or bottom?</h3>
				<p class="mbs-2">
					That's a rubber-band effect applied once you drag past the open or closed limit — it adds
					resistance instead of stopping abruptly, so the drawer still feels connected to the drag.
				</p>
			</div>
			<div>
				<h3>Can I control how far it opens?</h3>
				<p class="mbs-2">
					The drawer's height follows its own content rather than always filling the screen, so how
					far it opens is mostly determined by what you put inside it, within the bounds set by <code
						>range</code
					>.
				</p>
			</div>
		</section>
	{/if}
{/if}
