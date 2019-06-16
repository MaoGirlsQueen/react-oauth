import {Button} from "antd";
import Link from "next/link";

export default ({children})=>{
  return (
      <div>
          <header>
              <Link href="/a?id=2" as="/a/1"><Button>A</Button></Link>
              <Link href="/test/b"><Button>B</Button></Link>
          </header>
          {children}
      </div>
  )
}