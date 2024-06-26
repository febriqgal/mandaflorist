import { UserPost } from "@/types/user.type";
import { userRepo } from "./repository";

export const userService = {
  getAll: async () => {
    const res = userRepo.findAll();
    return res;
  },
  getById: async (id: string) => {
    const res = userRepo.findById(id);
    return res;
  },
  getByEmail: async (email: string) => {
    const res = userRepo.findByEmail(email);
    return res;
  },
  create: async (data: UserPost) => {
    const res = userRepo.create(data);
    return res;
  },
  update: async (id: string, data: any) => {
    const res = await userRepo.update(id, data);
    return res;
  },
  delete: async (id: string) => {
    const res = userRepo.delete(id);
    return res;
  },
};
