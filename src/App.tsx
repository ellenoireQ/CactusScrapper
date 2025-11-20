import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {
  Crosshair,
  LucideIcon,
  RefreshCcw,
  Search,
  SquareChevronRight,
} from "lucide-react";
import { colorScheme } from "./utils/colors";
import { PiCactus } from "react-icons/pi";

function IconButton({
  title,
  icon: Icon,
  buttonSize,
  className,
  state,
  onClick,
}: {
  title?: String;
  icon: LucideIcon;
  buttonSize?: 2 | 3 | 4 | 5;
  className?: String;
  state: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`icobutton ${buttonSize ? `p-${buttonSize}` : "p-3"} ${
        className ? className : ""
      } flex`}
      style={{
        backgroundColor: state
          ? colorScheme.button.buttonCheck.bgColor
          : colorScheme.button.buttonUncheck.bgColor,
        color: state
          ? colorScheme.button.buttonCheck.color
          : colorScheme.button.buttonUncheck.color,
      }}
      onClick={onClick}
    >
      <div className={title ? "pl-2" : "pl-0"}>
        <Icon size={20} className="" />
      </div>
      {title && <span className="w-full">{title}</span>}
    </button>
  );
}

function App() {
  const [result, setResult] = useState("");
  const [url, setUrl] = useState("");
  async function parse_url() {
    setResult(await invoke("parse_url", { url: url }));
  }
  const color = colorScheme;

  const [active, setActive] = useState({
    title: "Scrapper",
    index: 1,
  });
  const asideList = [
    {
      id: 1,
      title: "Scrapper",
      icon: Crosshair,
    },
    {
      id: 2,
      title: "Soon",
      icon: SquareChevronRight,
    },
  ];
  return (
    <main className="container">
      {/* Top bar app*/}
      <aside className="w-[50%]">
        <div className="flex gap-3 items-center">
          <PiCactus size={100} className="text-onSecondary" />
          <h1 className="text-2xl text-onSecondary">
            Cactus <br />
            Scrapper
          </h1>
        </div>
        <ul className="pt-5">
          <li className="space-y-2">
            {asideList.map((it, index) => (
              <IconButton
                title={it.title}
                icon={it.icon}
                buttonSize={3}
                className={"w-full"}
                state={active.index == it.id}
                onClick={() => {
                  setActive({ title: it.title, index: index + 1 });
                  parse_url();
                }}
              />
            ))}
          </li>
        </ul>
      </aside>

      <div className="w-full">
        <h1
          className="text-2xl pt-10 font-bold"
          style={{
            color: color.primary.base,
          }}
        >
          {active.title}
        </h1>
        {active.index === 1 && (
          <div>
            <div className="flex h-full gap-3">
              <div className="relative flex items-center justify-content gap-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search color={color.button.buttonCheck.color} />
                </div>
                <input
                  type="text"
                  id="input-group-1"
                  className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium text-heading text-sm focus:ring-brand shadow-xs placeholder:text-body bg-white rounded-2xl"
                  style={{
                    color: color.button.buttonCheck.color,
                    backgroundColor: color.button.buttonCheck.bgColor,
                  }}
                  placeholder="Paste the url right here"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      parse_url();
                    }
                  }}
                ></input>
              </div>
              <IconButton
                icon={RefreshCcw}
                state={true}
                onClick={() => setResult("")}
              />
            </div>
            <p className="pt-2">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
