import Select from "@/components/Select";
import { useState } from "react";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Four", value: 4 },
  { label: "Fifth", value: 5 },
]

export default function Home() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0])

  return (
    <>
      <Select options={options} value={value} onChange={e => setValue(e)} />
    </>
  )
}
