"use client";
import { useState, useEffect, use } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAction, readAction, updateAction, deleteAction } from "@/app/todo/actions";
import { todoItemsType } from "@/type";

export default function Todo() {
  //const [title, setTitle] = useState<string>('');

  const [todoItems, settodoItems] = useState<todoItemsType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {

    //read
    const handlereadTask = async () => {
      const readItems = await readAction();
      settodoItems(readItems || []);
    }

    handlereadTask();


  })

  //insert
  const handleInsertTask = async ( ) => {
    const insertItems = await createAction({ title, priority });
    setTitle('');
    setPriority(0);

    // settodoItems(insertItems || []);
  }

  //update
  const handleUpdateTask = async (id: number) => {
    const updateItems = await updateAction(id, title, priority, status);
    setTitle('');
    setPriority(0);
    setStatus(false); 
    // settodoItems(updateItems || []);
  }


  //delete 
  const handleDeleteTask = async (id: number) => {
    const deleteItems = await deleteAction(id);
    todoItems?.filter((item) => item.id !== id);
    //settodoItems(deleteItems || []);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: "200px" }}>
      <br />

      <Dialog>

        <DialogTrigger asChild>
          <div className="flex flex-start ">
            <Button style={{ backgroundColor: "orange", marginLeft: "20px" }} variant="outline">Add</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Add New Task to Your List.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={(e)=>{e.preventDefault();handleInsertTask()}}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>

                <Input
                  id="name"
                  placeholder="Enter Task"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Priority
                </Label>
                <Input
                  id="username"
                  placeholder="Enter Priority"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>

              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>


      <br />
      <Table>
        <TableCaption>To Do Tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TASK</TableHead>
            <TableHead className="text-right">PRIORITY</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>MODIFY</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {todoItems?.map((todo) => (
            <TableRow key={todo.id}>

              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.created_at}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>{todo.status ? 'DONE' : 'NOT DONE'}</TableCell>
              <TableCell>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex flex-start ">

                      <Button onClick={() => { setPriority(todo.priority), setStatus(todo.status), setTitle(todo.title) }} style={{ backgroundColor: "royalblue" }} variant="outline">Edit</Button>

                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Details </DialogTitle>
                      <DialogDescription>
                        Edit details of your tasks
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <form onSubmit={(e) => { e.preventDefault(); handleUpdateTask(todo.id) }}>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Title
                          </Label>

                          <Input
                            id="name"
                            placeholder="Edit Task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Priority
                          </Label>
                          <Input
                            id="username"
                            placeholder="Enter Priority"
                            value={priority}
                            onChange={(e) => setPriority(Number(e.target.value))}
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Status
                          </Label>
                          <Input
                            id="username"
                            placeholder="Enter Status" 
                            type='checkbox'
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            className="col-span-3"
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>

              </TableCell>
              <TableCell>
                <Button onClick={() => { handleDeleteTask(todo.id) }} style={{ backgroundColor: "red" }} variant="outline">Delete</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
