"use server";
import { createClient } from "@/utils/supabase/server";
import {Button} from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default async function Todo() {

    const supabase = createClient();

    let { data: ToDo } = await supabase
        .from('To Do')
        .select('*')

  return <div style={{ display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', marginTop: "200px"}}>
  <br />
  <Button style={{backgroundColor:"orange"}} variant="outline">Add</Button>

  <br />
  <Table >
    <TableCaption>To Do Tasks.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>DATE</TableHead>
        <TableHead>TASK</TableHead>
        <TableHead className="text-right">PRIORITY</TableHead>
        <TableHead>STATUS</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {ToDo.map((todo) => (
            <TableRow key = {todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.created_at}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell>{todo.status ? 'DONE':'NOT DONE'}</TableCell>
            <Button style={{backgroundColor:"royalblue"}}variant="outline">Edit</Button>
            <Button style={{backgroundColor:"red"}} variant="outline">Delete</Button>
            

          </TableRow>

        ))}
      
    </TableBody>
  </Table>
  </div>;

}
