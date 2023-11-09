import { useState, useEffect } from "react";
import FloatingInput from "../components/FloatingInput";
import ItemList from "../components/ItemList";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "../utils/supabaseClient";
import useSound from "use-sound";
import { Icon } from "@iconify/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [play, { stop }] = useSound("/assets/grace.mp3", {
    volume: 0.5,
  });

  useEffect(() => {
    loadItemsFromSupabase();
  }, []);

  const audioHandler = () => {
    if (!audioPlaying) {
      play();
      setAudioPlaying(true);
    } else {
      stop();
      setAudioPlaying(false);
    }
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
        data.map((item) => ({
          word: item.word,
          definition: item.definition,
          memorized: item.memorized,
        }))
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
      <audio src="/assets/grace.mp3" autoPlay />
      <div className="">
        <h1 className="font-serif header">Word Nook</h1>
      </div>
      <div
        onClick={audioHandler}
        class="w-12 h-12 bg-gray-700 rounded-full cursor-pointer select-none
active:translate-y-1  active:[box-shadow:0_0px_0_0_#6b7280,0_0px_0_0_#6b7280]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_4px_0_0_#6b7280,0_6px_0_0_#6b7280]
border-[1px] border-gray-600
"
      >
        <span class="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
          {audioPlaying ? (
            <Icon icon="icomoon-free:volume-mute2" />
          ) : (
            <Icon icon="icomoon-free:volume-medium" />
          )}
        </span>
      </div>
      <FloatingInput onEnter={handleEnter} />
      <ItemList
        items={items}
        onDelete={handleDelete}
        onMemorize={handleMemorize}
      />
      {/*<Footer />*/}
    </main>
  );
}
