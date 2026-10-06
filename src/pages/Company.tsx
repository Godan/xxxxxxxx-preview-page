import { InfoTable, PageHeader, Placeholder } from "../components/Parts";
import { Section, SectionHead } from "../components/Section";

export function Company() {
  return (
    <>
      <PageHeader en="Company" title="会社情報" crumbs={[{ label: "Company" }]} />

      <Section intent="会社概要。取引先が確認したい基本情報を表で正確に示す">
        <SectionHead en="Profile" title="会社概要" />
        <InfoTable
          rows={[
            ["商号", "ああああXxxxxxxx（あ）"],
            ["設立", "0000あ0あ0あ"],
            ["所在地", "〒000-0000 ああああああああ0-0-0 あああああ 0あ"],
            ["代表者", "あああああ　ああ あ"],
            [
              "事業内容",
              <ul className="plain-list">
                <li>0XXXああ</li>
                <li>あああああ・ああ</li>
                <li>あああ・あああああああああXXああ</li>
                <li>ああ・ああああああああああ</li>
                <li>あああああああああ・ああ</li>
              </ul>,
            ],
          ]}
        />
      </Section>

      <Section intent="アクセス。来社する人が場所と行き方を確認できるようにする">
        <SectionHead en="Access" title="アクセス" />
        <div className="split split--media">
          <Placeholder label="地図（埋め込み予定）" ratio="4:3" />
          <div>
            <p className="text">
              〒000-0000
              <br />
              ああああああああ0-0-0 あああああ 0あ
            </p>
            <ul className="plain-list text">
              <li>XXあああ「あああ」ああああああああ0あ</li>
              <li>あああああああ「あああ」X0ああああああ0あ</li>
            </ul>
            <p className="text text--small">※ああああああ、あああああああああああああああ。</p>
          </div>
        </div>
      </Section>
    </>
  );
}
