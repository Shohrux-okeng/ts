import { useState, type ChangeEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneApi } from "../api";

interface Phone {
  id?: number;
  title: string;
  price: string;
  storage: string;
  ram: string;
  brand: string;
}

export default function About() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Phone>({
    title: "",
    price: "",
    storage: "",
    ram: "",
    brand: ""
  });

  const { data: phones = [] } = useQuery<Phone[]>({
    queryKey: ["phones"],
    queryFn: async () => {
      const res = await phoneApi.get("/");
      return res.data;
    }
  });

  const addPhone = useMutation({
    mutationFn: (newPhone: Phone) => phoneApi.post("/", newPhone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["phones"] })
  });

  const deletePhone = useMutation({
    mutationFn: (id: number) => phoneApi.delete(`/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["phones"] })
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
       <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
       <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="storage" placeholder="Storage" value={form.storage} onChange={handleChange} />
       <input name="ram" placeholder="RAM" value={form.ram} onChange={handleChange} />
       <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />

      <button
        onClick={() => {
          addPhone.mutate(form);
          setForm({ title: "", price: "", storage: "", ram: "", brand: "" });
        }}
      >
        Add
      </button>

      <ul>
        {phones.map((p) => (
          <li key={p.id}>
            {p.title} - {p.price}$ - {p.storage}GB - {p.ram}GB - {p.brand}
            <button onClick={() => deletePhone.mutate(p.id!)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
