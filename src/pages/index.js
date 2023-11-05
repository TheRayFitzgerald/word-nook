import { useState, useEffect } from "react";
import FloatingInput from "../components/FloatingInput";
import ItemList from "../components/ItemList";
import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "../utils/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState([]);

  const deleteItemFromList = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const deleteItemFromSupabase = async (word) => {
    const { error } = await supabase.from("words").delete().eq("word", word);

    if (error) {
      console.log(error);
    }
  };

  const handleDelete = (item) => {
    deleteItemFromList(item);
    deleteItemFromSupabase(item.word);
  };

  const addItemToList = (word, definition) => {
    setItems((prevItems) => [{ word, definition }, ...prevItems]);
  };

  const addItemToSupabase = async (word, definition) => {
    const { error } = await supabase.from("words").insert([
      {
        word: word,
        definition: definition,
      },
    ]);

    if (error) {
      console.log(error);
    }
  };

  const loadItemsFromSupabase = async () => {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setItems(
        data.map((item) => ({ word: item.word, definition: item.definition }))
      );
    }
  };

  useEffect(() => {
    loadItemsFromSupabase();
  }, []);

  const handleEnter = async (word) => {
    const response = await fetch(`/api/define?word=${word}`);
    const definition = await response.json();

    addItemToList(word, definition);
    addItemToSupabase(word, definition);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
    >
      <div className="">
        <h1 className=" font-serif header">Word Nook</h1>
      </div>

      <FloatingInput onEnter={handleEnter} />
      <ItemList items={items} onDelete={handleDelete} />
    </main>
  );
}
