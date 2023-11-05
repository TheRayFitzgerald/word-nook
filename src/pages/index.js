import { useState, useEffect } from "react";
import FloatingInput from "../components/FloatingInput";
import ItemList from "../components/ItemList";
import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "../utils/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItemsFromSupabase();
  }, []);

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

  const deleteItemFromSupabase = async (word) => {
    const { error } = await supabase.from("words").delete().eq("word", word);

    if (error) {
      console.log(error);
    }
  };

  const markAsMemorizedInSupabase = async (word) => {
    const { error } = await supabase
      .from("words")
      .update({ memorized: true })
      .eq("word", word);

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
        data.map((item) => ({ word: item.word, definition: item.definition, memorized: item.memorized }))
      );
    }
  };

  const addItemToList = (word, definition) => {
    setItems((prevItems) => [{ word, definition }, ...prevItems]);
  };

  const deleteItemFromList = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const markAsMemorizedInList = (item) => {
    setItems((prevItems) =>
      prevItems.map((i) => (i === item ? { ...i, memorized: true } : i))
    );
  };

  const handleEnter = async (word) => {
    word = word.toLowerCase();
    const response = await fetch(`/api/define?word=${word}`);
    const definition = await response.json();

    addItemToList(word, definition);
    addItemToSupabase(word, definition);
  };

  const handleDelete = (item) => {
    deleteItemFromList(item);
    deleteItemFromSupabase(item.word);
  };

  const handleMemorize = (item) => {
    markAsMemorizedInSupabase(item.word);
    markAsMemorizedInList(item);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
    >
      <div className="">
        <h1 className=" font-serif header">Word Nook</h1>
      </div>

      <FloatingInput onEnter={handleEnter} />
      <ItemList items={items} onDelete={handleDelete} onMemorize={handleMemorize} />
    </main>
  );
}
