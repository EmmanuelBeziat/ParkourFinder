<template>
	<header class="header">
		<div class="container-fluid flex">
			<h1 class="header-title">ParkourFinder</h1>

			<nav class="header-actions">
				<button class="btn"><i class="icon-plus" aria-hidden="true"></i><div class="sr-only">Add new</div></button>
			</nav>
		</div>
	</header>
</template>

<style lang="stylus">
.header
	background #fff
	padding .5rem 0
	box-shadow 0 0 5px rgba(0, 0, 0, .25)
	position relative
	z-index 10

.header-title
	margin 0
	font-size 1.5rem

.header-actions
	margin-left auto

	.btn
		padding .25em
		font-size 1.1rem
</style>
