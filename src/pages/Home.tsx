import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger } from '../components/ui/motion'
import { useDashboardLayout } from '../hooks/useDashboardLayout'
import { usePalette } from '../components/palette/PaletteProvider'
import { widgetById } from '../components/widgets/registry'
import WidgetGrid from '../components/widgets/WidgetGrid'
import DashboardToolbar from '../components/widgets/DashboardToolbar'

export default function Home() {
  const [editing, setEditing] = useState(false)
  const { order, hidden, visible, setOrder, hide, show, reset, isDefault } = useDashboardLayout()
  const { toast } = usePalette()
  return (
    <>
      <h1 className="sr-only">Home dashboard</h1>
      <DashboardToolbar editing={editing} onToggle={() => setEditing((v) => !v)} hidden={hidden} canReset={!isDefault}
        onShow={(id) => { show(id); toast(`${widgetById(id)?.title} added`) }} onReset={() => { reset(); toast('Layout reset') }} />
      <motion.div variants={stagger} initial="hidden" animate="show">
        <WidgetGrid visible={visible} order={order} editing={editing} onReorder={setOrder} onHide={(id) => { hide(id); toast(`${widgetById(id)?.title} hidden`) }} />
      </motion.div>
    </>
  )
}
