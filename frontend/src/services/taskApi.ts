import { axiosClient } from "./axiosClient";
import type { Task } from "../types/Task";

const TODOS_ENDPOINT = "/todos"

export const taskApi = {
    async getAll(): Promise<Task[]> {
        const res = await axiosClient.get<Task[]>(TODOS_ENDPOINT);
        return res.data
    },

    async create(title: string){
        const res = await axiosClient.post(TODOS_ENDPOINT, {title});
        return res.data
    },

    async update(id: number, data: Task){
        const res = await axiosClient.put(`${TODOS_ENDPOINT}/${id}`, {data})
        return res.data
    },

    async delete(id: number){
        const res = await axiosClient.delete(`${TODOS_ENDPOINT}/${id}`)
        return res.data
    }

}