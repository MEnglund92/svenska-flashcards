# Question generation spec for novel comprehension questions

Each chapter file under `novels_text/<book>/` contains one reading unit:
metadata header (book, chapter number/title, page range) followed by the
Swedish chapter text.

## Output

For each chapter, write ONE JSON file:
`questions/<book>/<NN>_<slug>.json` — NN = zero-padded chapter number,
slug = same slug as the chapter text file.

Schema:

```json
{
  "book": "ondskan",
  "chapter": 1,
  "title": "Del 1",
  "questions": [
    {
      "type": "mcq",
      "q": "Varför vred Erik huvudet snett uppåt vid middagsbordet?",
      "opts": ["För att undvika slaget", "För att få ett mindre ont träffområde", "För att titta på farsan", "För att han hörde något"],
      "answer": 1,
      "q_en": "Why did Erik turn his head upward at the dinner table?",
      "opts_en": ["To avoid the blow", "To get a less painful hit area", "To look at his father", "Because he heard something"]
    },
    {
      "type": "tf",
      "q": "Farsan arbetade som hovmästare på en krog.",
      "answer": true,
      "q_en": "His father worked as a head waiter at a restaurant."
    }
  ]
}
```

## Rules (STRICT — every rule applies to every chapter)

1. **10 questions per chapter exactly: 6 multiple-choice (mcq) + 4 true/false (tf).**
2. Questions are in **Swedish**; `q_en`/`opts_en` are **accurate English translations**
   of the same content (not paraphrases that change meaning).
3. Every answer MUST be directly verifiable from the chapter text (facts,
   events, characters, places, dates, numbers, motivations, dialogue).
4. T/F statements must be about explicit facts in the text — some true, some
   false; vary them; false statements must be clearly contradicted by the text.
5. MCQ: exactly 4 options, ONE correct; `answer` = 0-based index of the
   correct option. Distractors must be plausible but clearly wrong (same
   chapter's characters/places/numbers make good distractors).
6. Cover different parts of the chapter: don't cluster all questions around
   the first paragraph. Mix who/what/where/when/why/how questions.
7. No questions about the header, page numbers, formatting, or anything
   outside the chapter text.
8. Keep questions concise (< 25 words Swedish). Options < 12 words.
9. Output file must be valid JSON, UTF-8 (ensure_ascii=False), exactly one
   file per chapter.
