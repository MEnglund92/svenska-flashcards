from dataclasses import dataclass, field
from typing import Optional


@dataclass
class SourceInfo:
    book: str
    chapter: str = ""
    page: int = 0
    section: str = ""
    confidence: float = 0.0


@dataclass
class Entry:
    phrase: str
    meaning: str
    translation: str
    category: str = "unknown"
    difficulty: str = "medium"
    related: list[str] = field(default_factory=list)
    sentence: Optional[str] = None
    blankAnswer: Optional[str] = None
    partOfSpeech: Optional[str] = None
    wordClass: Optional[str] = None
    lemma: Optional[str] = None
    source: Optional[SourceInfo] = None
    notes: Optional[str] = None
    alternativeSpellings: list[str] = field(default_factory=list)
    frequency: Optional[int] = None
    confidence: float = 1.0
    strategy: str = ""

    def to_dict(self):
        d = {
            "phrase": self.phrase,
            "meaning": self.meaning,
            "translation": self.translation,
            "category": self.category,
            "difficulty": self.difficulty,
        }
        if self.related:
            d["related"] = self.related
        if self.sentence:
            d["sentence"] = self.sentence
        if self.blankAnswer:
            d["blankAnswer"] = self.blankAnswer
        if self.partOfSpeech:
            d["partOfSpeech"] = self.partOfSpeech
        if self.wordClass:
            d["wordClass"] = self.wordClass
        if self.lemma:
            d["lemma"] = self.lemma
        if self.source:
            s = {}
            if self.source.book:
                s["book"] = self.source.book
            if self.source.chapter:
                s["chapter"] = self.source.chapter
            if self.source.page:
                s["page"] = self.source.page
            if self.source.section:
                s["section"] = self.source.section
            if s:
                d["source"] = s
        if self.notes:
            d["notes"] = self.notes
        if self.alternativeSpellings:
            d["alternativeSpellings"] = self.alternativeSpellings
        if self.frequency is not None:
            d["frequency"] = self.frequency
        d["confidence"] = round(self.confidence, 3)
        if self.strategy:
            d["strategy"] = self.strategy
        return d

    @staticmethod
    def from_dict(d: dict) -> "Entry":
        source_data = d.pop("source", None) if isinstance(d.get("source"), dict) else None
        source = SourceInfo(**source_data) if source_data else None
        return Entry(source=source, **{k: v for k, v in d.items() if k != "source"})


@dataclass
class CategoryDef:
    id: str
    name: str
    nameSv: str = ""
    color: str = "#4fc3f7"


@dataclass
class CourseDef:
    id: str
    name: str
    categories: list[CategoryDef] = field(default_factory=list)
    entries: list[Entry] = field(default_factory=list)
