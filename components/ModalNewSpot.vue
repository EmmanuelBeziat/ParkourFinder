<template>
	<div class="vue-modal">
		<section class="modal" id="add-new-spot">
			<header class="modal-header">
				<h2 class="modal-title">{{ text.title_addNewSpot }}</h2>
			</header>

			<div class="modal-body">
				<form action="" class="form">
					<div class="form-group">
						<label for="spot-title" class="form-label">Spot Name</label>
						<input type="text" class="form-input" id="spot-title" required>
					</div>
				</form>
			</div>

			<footer class="modal-footer">
				<button class="btn btn-default"><i class="icon-times" aria-hidden="true"></i> Cancel</button>
				<button class="btn btn-primary"><i class="icon-plus" aria-hidden="true"></i> Add new</button>
			</footer>
		</section>
		<div class="modal-layout"></div>
	</div>
</template>

<script>
export default {
	name: 'modalNewSpot',
	data () {
		return {
			text: {
				title_addNewSpot: 'Add a new spot'
			}
		}
	}
}
</script>

