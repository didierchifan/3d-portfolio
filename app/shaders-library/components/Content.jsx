export default function Content({ backgroundColor, color }) {
  return (
    <div
      style={{ backgroundColor }}
      className="py-8 px-12 h-full w-full flex flex-col justify-between"
    >
      <Section1 color={color} />
      <Section2 color={color} />
    </div>
  );
}

const Section1 = ({ color }) => {
  return (
    <div>
      <Nav color={color} />
    </div>
  );
};

const Section2 = ({ color }) => {
  return (
    <div className="flex justify-between items-end">
      <h1 style={{ color }} className="text-[10vw] leading-[0.8] mt-10">
        DIDIER CHIFAN
      </h1>
      <p style={{ color }}>©copyright</p>
    </div>
  );
};

const Nav = ({ color }) => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 style={{ color }} className="mb-2 uppercase ">
          About
        </h3>
        <p style={{ color }}>Home</p>
        <p style={{ color }}>Projects</p>
        <p style={{ color }}>Our Mission</p>
        <p style={{ color }}>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 style={{ color }} className="mb-2 uppercase ">
          Education
        </h3>
        <p style={{ color }}>News</p>
        <p style={{ color }}>Learn</p>
        <p style={{ color }}>Certification</p>
        <p style={{ color }}>Publications</p>
      </div>
    </div>
  );
};
