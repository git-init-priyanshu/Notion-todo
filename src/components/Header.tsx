import Peakflo from "@/assets/peakflo_logo.webp";
import Github from "@/assets/github.png";
import X from "@/assets/X-Logo.png";

export default function Header() {
  return (
    <div className="flex mx-10 md:mx-20 my-4 justify-between">
      <div className="flex gap-2 items-end">
        <img src={Peakflo} className="w-10" />
        <p className="hidden md:block text-neutral-500">Peakflo Internship Assignment</p>
      </div>

      <div className="flex gap-4 items-center">
        <a
          href="https://github.com/git-init-priyanshu/Notion-todo"
          target="_blank"
        >
          <img src={Github} className="w-8 h-fit opacity-60 cursor-pointer" />
        </a>
        <a href="https://x.com/PriyanshuBartw5" target="_blank">
          <img src={X} className="w-10 h-fit opacity-60 cursor-pointer" />
        </a>
      </div>
    </div>
  );
}
