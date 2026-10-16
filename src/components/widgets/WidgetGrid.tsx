import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type Announcements, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { EyeOff, GripVertical } from 'lucide-react'
import { useMemo } from 'react'
import { sizeClass, tabletStretch, widgetById } from './registry'

interface Props { visible: string[]; order: string[]; editing: boolean; onReorder: (order: string[]) => void; onHide: (id: string) => void }

function SortableWidget({ id, editing, onHide, stretch }: { id: string; editing: boolean; onHide: (id: string) => void; stretch: boolean }) {
  const def = widgetById(id)!
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !editing })
  return (
    <div ref={setNodeRef} data-widget-id={id} style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 30 : undefined }}
      className={`relative min-w-0 ${sizeClass[def.size]} ${stretch ? 'md:col-span-2 lg:col-span-4' : ''} ${editing ? 'rounded-3xl outline-dashed outline-1 outline-offset-4 outline-white/20' : ''} ${isDragging ? 'opacity-80 shadow-[0_20px_60px_-10px_rgba(91,108,255,.5)]' : ''}`}>
      {def.render()}
      {editing && (
        <div className="absolute bottom-full right-4 z-20 mb-1 flex items-center gap-1 rounded-2xl border border-white/15 bg-ink-900/95 p-1 backdrop-blur">
          <button type="button" onClick={() => onHide(id)} aria-label={`Hide ${def.title}`} className="flex h-11 w-11 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"><EyeOff size={16} aria-hidden /></button>
          <button type="button" ref={setActivatorNodeRef} {...attributes} {...listeners} aria-label={`Reorder ${def.title}`} className="flex h-11 w-11 cursor-grab touch-none items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white active:cursor-grabbing"><GripVertical size={18} aria-hidden /></button>
        </div>
      )}
    </div>
  )
}

export default function WidgetGrid({ visible, order, editing, onReorder, onHide }: Props) {
  // Drag only starts from the grip handle, so scrolling and clicking inside widgets is never hijacked.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))
  const stretch = useMemo(() => tabletStretch(visible), [visible])
  const title = (id: string | number) => widgetById(String(id))?.title ?? 'widget'
  const pos = (id: string | number) => `${visible.indexOf(String(id)) + 1} of ${visible.length}`
  const announcements: Announcements = {
    onDragStart: ({ active }) => `Picked up ${title(active.id)}. Position ${pos(active.id)}. Use arrow keys to move, Space to drop, Escape to cancel.`,
    onDragOver: ({ active, over }) => over ? `${title(active.id)} moved over ${title(over.id)}, position ${pos(over.id)}.` : `${title(active.id)} is no longer over a position.`,
    onDragEnd: ({ active, over }) => over ? `Dropped ${title(active.id)} at position ${pos(over.id)}.` : `Dropped ${title(active.id)}.`,
    onDragCancel: ({ active }) => `Cancelled. ${title(active.id)} returned to position ${pos(active.id)}.`,
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    onReorder(arrayMove(order, order.indexOf(String(active.id)), order.indexOf(String(over.id))))
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} accessibility={{ announcements, screenReaderInstructions: { draggable: 'To reorder, press Space on the grip, move with the arrow keys, then press Space to drop.' } }}>
      <SortableContext items={visible} strategy={rectSortingStrategy}>
        <motion.div layout={false} className={`grid gap-4 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-12 ${editing ? 'gap-y-[3.75rem] pt-14' : ''}`}>
          {visible.map((id) => <SortableWidget key={id} id={id} editing={editing} onHide={onHide} stretch={stretch.has(id)} />)}
        </motion.div>
      </SortableContext>
    </DndContext>
  )
}
