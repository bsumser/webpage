import SEO from './SEO.tsx';
export default function Now() {
  return (
    <div id="now" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <SEO 
          title="Now Page" 
          description="What I'm doing now." 
          canonical="https://tsumser.jp/now"
      />
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">Now</h1>
      <p className="flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm" />
    </div>
  );
}