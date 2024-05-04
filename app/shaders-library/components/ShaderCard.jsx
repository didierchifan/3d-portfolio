export default function ShaderCard({ name, description }) {
  return (
    <div
      id="shader--card"
      className="bg-orange-500 self-start rounded-3xl flex-shrink-0 gap-5 "
    >
      <div className="mt-5 ml-5 ">
        <h1>{name}</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
}
