import { PageHeader, Placeholder } from "../components/Parts";
import { Section, SectionHead } from "../components/Section";

const DOMAINS = [
  {
    title: "0XXXああ",
    text: "ああああああ、ああ、あああああああ、あああああああ0XXXああああああ。あああああああああああああああああああああああああ。",
  },
  {
    title: "ああああ",
    text: "あああああああああ、ああああ、ああああああああああ、ああ・ああああああああ・あああああああああああ。",
  },
  {
    title: "あああ・あああああああ",
    text: "ああああああああああああああああああ0XXXあああああ、あああああああああああああああああああああああ。",
  },
  {
    title: "ああ・ああああああああ",
    text: "ああああああああああああああああああああ、ああああああああああああああああああああああああああ。",
  },
];

const STRENGTHS = [
  {
    num: "01",
    title: "ああああああああ、ああああああああ",
    text: "ああああああ、あああああ、XXあああああああああああああああああああああ、ああああああああああああ、あああああああああああああ。",
  },
  {
    num: "02",
    title: "ああああああああああ",
    text: "ああああああああああああああああ、あああああああああああああああああああああ。ああああああああああああああああああああ。",
  },
  {
    num: "03",
    title: "あああああああああああ",
    text: "あああああああああ、あああああああああああああああああああああああ、ああああああああああああああああああああああああああああ。",
  },
];

export function About() {
  return (
    <>
      <PageHeader en="About" title="私たちについて" crumbs={[{ label: "About" }]} />

      <Section intent="ステートメント。会社が何を大切にしているかを最初に宣言する">
        <div className="statement">
          <p className="eyebrow">Statement</p>
          <h2 className="statement__title">
            あああああああ、
            <br />
            ああああああああああ。
          </h2>
          <div className="statement__body">
            <p className="text">
              Xxxxxxxxあああああああ、あああああああああああああああ、あああああああああああああああああああああ。
            </p>
            <p className="text">
              あああ、あああああああああああああああああ、あああああああああああああああ。ああああ0XXXあああああああああ、ああああああああああ「あああああああああ」あああ、あああああああああああああああああああ。
            </p>
          </div>
        </div>
      </Section>

      <Section intent="提供領域。何を依頼できる会社なのかを一覧で伝える">
        <SectionHead en="Service" title="提供領域" />
        <ul className="domain-grid">
          {DOMAINS.map((d) => (
            <li key={d.title} className="domain-card">
              <h3 className="domain-card__title">{d.title}</h3>
              <p className="text">{d.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section intent="体制・強み。他社ではなくここに頼む理由を示す">
        <SectionHead en="Strength" title="体制・強み" />
        <ol className="strength-list">
          {STRENGTHS.map((s) => (
            <li key={s.num} className="strength">
              <span className="strength__num">{s.num}</span>
              <div>
                <h3 className="strength__title">{s.title}</h3>
                <p className="text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="team">
          <Placeholder label="チーム体制図" ratio="21:9" />
          <dl className="facts">
            <div>
              <dt>ああああああああ</dt>
              <dd>00あ</dd>
            </div>
            <div>
              <dt>ああああああ</dt>
              <dd>あ00あ</dd>
            </div>
            <div>
              <dt>あああああああ</dt>
              <dd>00あああ</dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
