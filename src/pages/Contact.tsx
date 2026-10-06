import { cloneElement, useId, type ReactElement } from "react";
import { PageHeader } from "../components/Parts";
import { Section } from "../components/Section";

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactElement<{ id?: string }> }) {
  const id = useId();
  const control = cloneElement(children, { id });
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        <span>{label}</span>
        <span className={`field__badge${required ? " is-required" : ""}`}>{required ? "必須" : "任意"}</span>
      </label>
      <div className={`field__control${children.type === "select" ? " select-wrap" : ""}`}>{control}</div>
    </div>
  );
}

export function Contact() {
  return (
    <>
      <PageHeader en="Contact" title="お問い合わせ" crumbs={[{ label: "Contact" }]} />

      <Section intent="フォーム項目。問い合わせに必要な情報と、その並び順を合意する">
        <p className="text">
          あああああああ・あああああ・ああああああああ、あああああああああああああ。2あああああああああああああああああああ。
        </p>
        <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
          <Field label="お問い合わせ種別" required>
            <select className="input select" defaultValue="">
              <option value="" disabled>
                選択してください
              </option>
              <option>制作のご依頼・ご相談</option>
              <option>お見積もり</option>
              <option>取材・メディア掲載</option>
              <option>採用について</option>
              <option>その他</option>
            </select>
          </Field>
          <Field label="会社名・団体名">
            <input className="input" type="text" placeholder="例）株式会社サンプル" />
          </Field>
          <Field label="お名前" required>
            <input className="input" type="text" placeholder="例）山田 太郎" />
          </Field>
          <Field label="メールアドレス" required>
            <input className="input" type="email" placeholder="例）info@example.com" />
          </Field>
          <Field label="電話番号">
            <input className="input" type="tel" placeholder="例）03-0000-0000" />
          </Field>
          <Field label="ご予算感">
            <input className="input" type="text" placeholder="例）100万円前後 / 未定" />
          </Field>
          <Field label="お問い合わせ内容" required>
            <textarea className="input textarea" rows={8} placeholder="ご相談内容、ご希望の納期などをご記入ください" />
          </Field>

          <div className="form__agree">
            <label className="checkbox">
              <input type="checkbox" />
              <span>プライバシーポリシーに同意する</span>
            </label>
          </div>
          <div className="center">
            <button type="submit" className="btn btn--primary btn--lg">
              入力内容を確認する
            </button>
          </div>
        </form>
      </Section>
    </>
  );
}
