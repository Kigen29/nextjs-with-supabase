"use server"
import { createClient } from "@/utils/supabase/server";
import { todoItemsType } from "@/type";
const supabase = createClient();

type createItemsType={
    title:string;
    priority:number;
}


//read
export const readAction = async () => { 
let { data: ToDo, error } = await supabase
.from('To Do')
.select('*').order('id', {ascending: true})

return ToDo 
        
}
          
//create
export const createAction  =async ({title,priority}:createItemsType)  => {

    const { data, error } = await supabase
    .from('To Do')
    .insert([
      { title: title, priority: priority },
    ])
    .select()
    if(error){throw new Error('did not read action')}

    return data

}

//update
export const updateAction = async (id:number,title:string,priority:number,status:boolean) => {

    const { data, error } = await supabase
    .from('To Do')
    .update({ title : title, priority: priority, status: status})
    .eq('id', id)
    .select()

    return data

}   


//delete
export const deleteAction = async (id:number) => {

    const { data, error } = await supabase
    .from('To Do')
    .delete()
    .eq('id', id)
    .select()

    return data

}   


