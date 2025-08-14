import { useState, useEffect } from "react";
import { countryApi } from "../api";

interface Country {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
}

export default function Home() {
  const [data, setData] = useState<Country[]>([]);
  const [form, setForm] = useState<Omit<Country, "id">>({
    name: "",
    capital: "",
    population: "",
    area: ""
  });

  const getData = async () => {
    const res = await countryApi.get("/");
    setData(res.data);
  };

  const addData = async () => {
    await countryApi.post("/", form);
    setForm({ name: "", capital: "", population: "", area: "" });
    getData();
  };

  const deleteData = async (id: string) => {
    await countryApi.delete(`/${id}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Capital"
        value={form.capital}
        onChange={e => setForm({ ...form, capital: e.target.value })}
      />
      <input
        placeholder="Population"
        value={form.population}
        onChange={e => setForm({ ...form, population: e.target.value })}
      />
      <input
        placeholder="Area"
        value={form.area}
        onChange={e => setForm({ ...form, area: e.target.value })}
      />
      <button onClick={addData}>Add</button>

      <ul>
        {data.map((c) => (
          <li key={c.id}>
            {c.name} - {c.capital} - {c.population} - {c.area}
            <button onClick={() => deleteData(c.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
