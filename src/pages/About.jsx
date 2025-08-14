import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneApi } from "../api";

export default function About() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    price: "",
    storage: "",
    ram: "",
    brand: ""
  });

  const { data: phones = [] } = useQuery({
    queryKey: ["phones"],
      queryFn: async () => {
        const res = await phoneApi.get("/");
        return res.data;
    }
  });

  const addPhone = useMutation({
    mutationFn: (newPhone) => phoneApi.post("/", newPhone),
    onSuccess: () => queryClient.invalidateQueries(["phones"])
  });

  const deletePhone = useMutation({
    mutationFn: (id) => phoneApi.delete(`/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["phones"])
  });

  return (
    <div className="p-4">
  <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
    <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
     <input placeholder="Storage" value={form.storage} onChange={e => setForm({ ...form, storage: e.target.value })} />
       <input placeholder="RAM" value={form.ram} onChange={e => setForm({ ...form, ram: e.target.value })} />
        <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
       <button onClick={() => {
        addPhone.mutate(form);
        setForm({ title: "", price: "", storage: "", ram: "", brand: "" });
      }}>Add</button>

      <ul>
        {phones.map(p => (
         <li key={p.id}>
            {p.title} - {p.price}$ - {p.storage}GB - {p.ram}GB - {p.brand}
            <button onClick={() => deletePhone.mutate(p.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
