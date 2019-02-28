<template>
	<div class="create-note">
		<v-layout row wrap>
			<v-btn slot="action" @click="create" class="cyan accent-3" bottom contained fab fixed right round dark default >
				<v-icon>done</v-icon>
			</v-btn>
			<v-flex xs6 offset-xs3>
				<div class="pl-4 pr-4 pt-2 pb-2">
					<v-text-field 
					:rules="[rules.required]"
					label="Title" 
					placeholder="..." 
					v-model="note.title"
					></v-text-field>
					<br>
					<v-textarea
					:rules="[rules.required]"
					v-model="note.content"
					success
					name="input-7-1"
					box
					label="Note Content"
					auto-grow
					></v-textarea>
					<br>
					<!-- <editor-content :editor="editor">
						<editor-menu-bar :editor="editor">
							<div slot-scope="{ commands, isActive }">
								<button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
									Bold
								</button>
								<button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
									H2
								</button>
							</div>
						</editor-menu-bar>
					</editor-content> -->
					<div class="error" v-html="error">
					</div>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
// Import the editor
import { Editor } from 'tiptap'
import NoteService from '../../services/NoteService.js'

export default {
	data() {
		return {
			note:{
				title:'',
				content:'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
			},
			error: null,
			rules: {
				required: (value) => !!value || 'Required!'
			}

		}
	},
	mounted() {
		this.editor = new Editor({
			content: '<p>This is just a boring paragraph</p>',
		})
	},
	beforeDestroy() {
		this.editor.destroy()
	},
	methods: {
		async create(){
			this.error = null
			const areAllFieldsFilledIn = Object.keys(this.note).every(key => !!this.note[key])
			if(!areAllFieldsFilledIn) {
				this.error = 'Please fill in all the required fields.'
				return
			}
			try{
				const note = await NoteService.post({
					note: this.note,
					userId: this.$store.state.user.id

				})
				console.log(note)
			} catch(error){
				console.log(error)
			}
		}
	}
}
</script>

<style scoped>

</style>
