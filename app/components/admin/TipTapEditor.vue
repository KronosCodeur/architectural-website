<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val, false)
  }
})

onBeforeUnmount(() => editor.value?.destroy())

const actions = [
  { cmd: 'toggleBold', icon: 'lucide:bold', active: () => editor.value?.isActive('bold') },
  { cmd: 'toggleItalic', icon: 'lucide:italic', active: () => editor.value?.isActive('italic') },
  { cmd: 'toggleBulletList', icon: 'lucide:list', active: () => editor.value?.isActive('bulletList') },
  { cmd: 'toggleOrderedList', icon: 'lucide:list-ordered', active: () => editor.value?.isActive('orderedList') },
]

function run(cmd: string) {
  (editor.value?.chain().focus() as Record<string, () => unknown>)[cmd]?.()
}
</script>

<template>
  <div class="tiptap-wrap">
    <div class="tiptap-toolbar">
      <button
        v-for="action in actions"
        :key="action.cmd"
        type="button"
        class="toolbar-btn"
        :class="{ 'is-active': action.active?.() }"
        @click="run(action.cmd)"
      >
        <UIcon :name="action.icon" />
      </button>
    </div>
    <EditorContent :editor="editor" class="tiptap-editor" />
  </div>
</template>

<style scoped>
.tiptap-wrap {
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.tiptap-toolbar {
  display: flex;
  gap: 2px;
  padding: 6px 8px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.toolbar-btn {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: background 0.15s, color 0.15s;
}

.toolbar-btn:hover, .toolbar-btn.is-active {
  background: #e5e7eb;
  color: #111827;
}

.tiptap-editor :deep(.ProseMirror) {
  padding: 12px;
  min-height: 120px;
  outline: none;
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
}

.tiptap-editor :deep(.ProseMirror p) { margin: 0 0 8px; }
.tiptap-editor :deep(.ProseMirror ul),
.tiptap-editor :deep(.ProseMirror ol) { padding-left: 20px; margin: 0 0 8px; }
.tiptap-editor :deep(.ProseMirror p.is-empty::before) {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
  float: left;
  height: 0;
}
</style>
