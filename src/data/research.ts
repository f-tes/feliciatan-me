export type Stat = { value: string; label: string };
export type Media = { src: string; alt: string; kind: "image" | "video" | "art"; poster?: string; caption?: string; badge?: string };
/** Annotation box on the lead media. x/y/w/h are percentages of the (8:3) media frame. */
export type Callout = { label: string; x: number; y: number; w: number; h: number };
export type DataTable = { title: string; caption?: string; columns: string[]; rows: string[][]; highlight?: number[] };
export type Research = {
  slug: "maestro" | "meta-robots" | "sindex";
  name: string;
  tagline: string;
  affiliation: string;
  period: string;
  homeBlurb: string;
  highlight: string;
  stats: Stat[];
  lead: Media | null; // null => provisional placeholder
  callouts?: Callout[];
  coauthors?: string[];
  /** shown on the homepage showcase and the page header */
  honour?: string;
  recognition: string[];
  motivation?: string[];
  problem?: string[];
  approach?: { title: string; body: string }[];
  setup?: string[];
  tables?: DataTable[];
  figures?: Media[];
  poster?: { src: string; alt: string };
  paper?: { pages: number; dir: string; title: string };
  inProgress?: boolean; // shows the "write-up in progress" note
  overview: string[];
  contributions: { title: string; body: string }[];
  results: { value: string; label: string; note?: string }[];
  resultsNote?: string;
  resultsExtra?: string[];
  verify: string[]; // claims still to be confirmed (not shown publicly; tracked in MISSING.md)
  limitations?: string[];
  future?: string[];
};

export const research: Research[] = [
  {
    slug: "maestro",
    name: "MAESTRO",
    tagline: "Multimodal Video Understanding",
    affiliation: "DSO National Laboratories",
    period: "Feb 2024 – May 2025",
    homeBlurb: "Video models tend to overlook sound. MAESTRO fuses what is seen, said and heard, then reasons over the moments that matter, outperforming GPT-4V on hateful-video detection with no dataset-specific training.",
    highlight: "93% F1 · Regeneron ISEF 2nd Place",
    honour: "Recognised by Singapore's Minister of Defence",
    coauthors: ["Low Li Ying Amy"],
    stats: [
      { value: "93%", label: "F1(O) on MultiHateClip" },
      { value: "86%", label: "MSVD-QA accuracy" },
    ],
    lead: {
      kind: "art",
      src: "maestro",
      alt: "Schematic of MAESTRO: video frames, speech and non-speech audio are merged into a unified representation, which an agent reasons over before giving a verdict with an explanation.",
    },
    poster: {
      src: "/media/maestro/poster.webp",
      alt: "ISEF research poster for MAESTRO: background, methodology, ablations, hateful video detection and VQA results, deployment, conclusion and future work.",
    },
    paper: { pages: 18, dir: "/media/maestro/paper", title: "Great Minds Think Alike, Great Models Think All At Once: MAESTRO, A Unified Framework for Video-Audio Understanding & Reasoning" },
    figures: [
      { kind: "image", src: "/media/maestro/results-strip.webp", alt: "Poster detail: MultiHateClip results table with MAESTRO at 0.96 accuracy and 0.95 macro-F1, and an example where MAESTRO flags two hateful segments that Video-LLaMA and LLaVA-OneVision miss.", caption: "From the poster: MultiHateClip results and a qualitative example where MAESTRO flags both hateful segments that the other models miss." },
      { kind: "image", src: "/media/maestro/fig-uma.webp", alt: "Unified modality alignment: chunk-level visual captions, speech transcript and a non-speech sound label merged into a unified representation.", caption: "Unified modality alignment: what is seen, said and heard becomes one unified representation." },
      { kind: "image", src: "/media/maestro/fig-pipeline.webp", alt: "MAESTRO's pipeline: semantic segmentation, unified modality alignment, and the global-local reasoning loop.", caption: "The full pipeline: semantic segmentation → unified modality alignment → global-local reasoning loop." },
      { kind: "image", src: "/media/maestro/fig-ssm.webp", alt: "Semantic segmentation: a transcript is split into semantic chunks by a modified BERT chunker and paired with video frames.", caption: "Semantic segmentation forms idea-frame pairs: a semantic chunk of the transcript plus the frames in its time span." },
      { kind: "image", src: "/media/maestro/fig-glrl.webp", alt: "The global-local reasoning loop: an LLM control agent self-reflects, requests information from tools, and updates a local text representation until confident.", caption: "The global-local reasoning loop: the control agent keeps gathering evidence until it is confident enough to answer." },
    ],
    recognition: [
      "Regeneron ISEF 2025: 2nd Place Grand Award, Robotics and Intelligent Machines",
      "Singapore Science and Engineering Fair 2025: Gold Award",
      "Recognised by Singapore's Minister of Defence",
    ],
    overview: [
      "MAESTRO (Multimodal Agentic model with Efficient, Synergistic Text-Reasoning Optimisation) is a multimodal video-language framework that reasons over visual information, speech, and non-speech audio together.",
      "It was first developed for hateful-video understanding, where meaning often lives in the interplay between what is shown, what is said, and what is heard, and was then evaluated on general video question-answering benchmarks.",
    ],
    motivation: [
      "Platforms such as YouTube receive over 500 hours of video every minute, and TikTok and Bilibili have reached billions of users. Moderation still leans heavily on manual review, which is slow, hard to scale, and exposes moderators to mental distress.",
      "Vision-language models could help, but video is hard for them: meaning frequently emerges only when frames, speech, and sound are considered together. Many models ignore audio, append a transcript as plain text, process audio and video in separate streams, or pay a heavy cost to look at every frame.",
    ],
    problem: [
      "Hateful video classification: given a video and its audio, decide whether it meets two criteria. (1) It targets an individual or group based on a characteristic. (2) It discriminates against, blames, or encourages harm, fear, or hatred toward them, or threatens societal peace.",
      "The same framework is also evaluated on general video question answering, to test whether the design carries beyond a single use case.",
    ],
    approach: [
      { title: "Semantic segmentation", body: "The speech transcript is split into semantic chunks by a modified BERT-based chunker (boundary threshold 0.65). Each chunk is paired with the video frames in its time span, forming an \"idea-frame pair\", so reasoning follows ideas rather than fixed-length windows." },
      { title: "Unified modality alignment: speech", body: "Voice activity detection finds speech segments, which are transcribed with Whisper and aligned to the timeline with forced phoneme alignment." },
      { title: "Unified modality alignment: non-speech audio", body: "MAESTRO-CLAP, inspired by LAION-CLAP, maps a sound event to a descriptive label (what it is) and a contextual label (what it is doing there, e.g. marking a punchline). It pairs PANN and HTS-AT audio encoders with CLIP, BERT and RoBERTa text encoders in a shared 512-d space, trained contrastively on SocialSound-11k." },
      { title: "Unified modality alignment: visual", body: "LLaVA-OneVision describes each chunk's frames. Descriptions, transcript and sound labels are concatenated into a unified text representation of the video." },
      { title: "Global-local reasoning loop", body: "A control agent (GPT-3.5-Turbo in the paper) first reads a global representation built from keyframes per chunk. Each round it proposes a hypothesis, scores its own confidence from 1 to 3, and either answers or calls a tool on a chosen chunk: LLaVA-OneVision for actions, YOLO for objects and symbols, and videoDeepFace, an extension of DeepFace that tracks identities across frames." },
    ],
    contributions: [
      { title: "Semantic Segmentation Mechanism", body: "Partitions videos into meaningful temporal chunks, precisely aligning visual, speech-audio, and non-speech audio signals without inefficient frame-by-frame processing." },
      { title: "Unified Modality Alignment", body: "Recognised the underused role of audio in then-dominant video-language systems, jointly aligning visual, speech, and non-speech audio representations for deeper multimodal reasoning." },
      { title: "Global-Local Reasoning Loop", body: "Forms a global semantic understanding before iteratively refining local analysis, reducing quadratic fusion costs and improving robustness on long-form videos." },
      { title: "SocialSound-11k", body: "Curated an 11,028-pair audio-language dataset for non-speech social-sound understanding." },
    ],
    setup: [
      "Hateful video detection: the English YouTube subset of MultiHateClip, as a binary task. Metrics are accuracy, macro-F1, and F1, recall and precision on the offensive class, written F1(O), R(O), P(O).",
      "MAESTRO is evaluated without dataset-specific training on MultiHateClip, whereas several comparison models were fine-tuned on it. MAESTRO-CLAP itself is trained separately on SocialSound-11k: 8,822 of its 11,028 examples, 20 epochs, about 153.5M trainable parameters.",
      "General video QA: MSRVTT-QA and MSVD-QA, reported as accuracy.",
    ],
    results: [
      { value: "93%", label: "F1(O)", note: "MultiHateClip" },
      { value: "95%", label: "macro-F1", note: "MultiHateClip" },
      { value: "80%", label: "MSRVTT-QA", note: "accuracy" },
      { value: "86%", label: "MSVD-QA", note: "accuracy" },
    ],
    resultsNote: "Tables are reproduced from the report. Best results are highlighted.",
    resultsExtra: [
      "On MultiHateClip, MAESTRO scores 0.96 accuracy and 0.95 macro-F1, ahead of GPT-4V (0.81 / 0.79).",
      "The framework is model-agnostic: swapping the control agent to Qwen2 (7B) raises accuracy from 0.43 (Qwen-VL alone) to 0.54, and ChatGPT 3.5 from 0.70 (text prompt only) to 0.96.",
      "MAESTRO-CLAP reaches an F1 of 0.84 zero-shot on the SocialSound-11k test set, ahead of the other non-speech audio classifiers compared in the report.",
      "In the report's experimental trials MAESTRO was 2.6× faster than human moderators.",
    ],
    tables: [
      {
        title: "Hateful video detection · MultiHateClip (English YouTube, binary)",
        caption: "T = text, A = audio, V = video, VL = vision-language, M = multimodal. F1/R/P are for the offensive class.",
        columns: ["Model", "Acc", "M-F1", "F1(O)", "R(O)", "P(O)"],
        rows: [
          ["mBERT", "0.57", "0.57", "0.52", "0.42", "0.68"],
          ["GPT-4", "0.81", "0.79", "0.73", "0.69", "0.78"],
          ["Qwen", "0.72", "0.71", "0.65", "0.57", "0.75"],
          ["MFCC", "0.54", "0.50", "0.36", "0.33", "0.40"],
          ["Wav2Vec", "0.53", "0.48", "0.64", "0.50", "0.90"],
          ["ViViT", "0.73", "0.73", "0.68", "0.57", "0.86"],
          ["ViT", "0.63", "0.58", "0.44", "0.46", "0.45"],
          ["VLM", "0.70", "0.64", "0.48", "0.59", "0.41"],
          ["GPT-4V", "0.81", "0.79", "0.73", "0.72", "0.73"],
          ["Qwen-VL", "0.62", "0.61", "0.56", "0.46", "0.72"],
          ["T1 ⊙ A1 ⊙ V1 (multimodal)", "0.75", "0.74", "0.67", "0.61", "0.77"],
          ["MAESTRO (ours)", "0.96", "0.95", "0.93", "0.87", "1.0"],
        ],
        highlight: [11],
      },
      {
        title: "General video QA · accuracy",
        columns: ["Model", "Modality", "MSRVTT-QA", "MSVD-QA"],
        rows: [
          ["Video LLaMA (7B)", "V, A", "0.30", "0.52"],
          ["Video-ChatGPT (7B)", "V", "0.49", "0.65"],
          ["PLLaVA (34B)", "V", "0.69", "0.79"],
          ["Flash-VStream", "V, A", "0.72", "0.80"],
          ["Tarsier (34B)", "V", "0.66", "0.80"],
          ["MAESTRO (ours)", "V, A", "0.80", "0.86"],
        ],
        highlight: [5],
      },
      {
        title: "Ablations · MultiHateClip",
        caption: "Removing either the semantic segmentation or the reasoning loop hurts; swapping the control agent shows the gain is not tied to one model.",
        columns: ["Model", "Acc", "M-F1", "F1(O)", "R(O)", "P(O)"],
        rows: [
          ["MAESTRO w/o semantic segmentation", "0.60", "0.62", "0.61", "0.63", "0.62"],
          ["MAESTRO w/o global-local reasoning loop", "0.70", "0.69", "0.71", "0.68", "0.70"],
          ["Qwen-VL (7B)", "0.43", "0.46", "0.40", "0.39", "0.41"],
          ["MAESTRO with Qwen2 (7B)", "0.54", "0.52", "0.51", "0.50", "0.48"],
          ["ChatGPT 3.5 with text prompt", "0.70", "0.68", "0.69", "0.67", "0.70"],
          ["MAESTRO with ChatGPT 3.5", "0.96", "0.95", "0.93", "0.87", "1.0"],
        ],
        highlight: [5],
      },
    ],
    limitations: [
      "Occasional hallucinations.",
      "Misclassification when context is incomplete, especially for content that depends on cultural context.",
      "Tone in speech is not interpreted (sarcasm, for example).",
    ],
    future: [
      "Segment Anything and Set-of-Marks prompting to feed the agent key visual segments and reduce hallucinations.",
      "A tone-detection tool, and a Self-RAG mechanism to retrieve missing information.",
      "Swapping the control agent and transcription model to cover other languages and cultures.",
    ],
    verify: [
      "Report text (§4.2) cites F1-scores of 82.0% (MSRVTT-QA) and 86.9% (MSVD-QA), while Table 4 lists accuracy 0.80 and 0.86; the CV and poster quote +8.0 / +6.9 points. Table 4 gives +8.0 and +6.0 over the best prior. Confirm which figures and metric to quote.",
      "'93% F1' corresponds to F1(O) (offensive class); macro-F1 is 0.95.",
      "Co-author credit: Low Li Ying Amy (listed on the report and poster).",
    ],
  },
  {
    slug: "meta-robots",
    name: "Meta-Robots",
    tagline: "Agentic Improvement for Embodied AI",
    affiliation: "DSO National Laboratories",
    period: "May – Jul 2026",
    homeBlurb: "An agent studies why a navigation system fails, proposes a fix, implements it and measures the effect, lifting HM3D ObjectNav success from 65.4% to 68.9% over the ASCENT baseline.",
    highlight: "68.9% HM3D ObjectNav success · +3.5 pp over baseline",
    stats: [
      { value: "68.9%", label: "HM3D ObjectNav success" },
      { value: "+3.5 pp", label: "over ASCENT baseline" },
    ],
    lead: {
      kind: "video",
      src: "/media/meta-robots/objectnav-couch-demo.mp4",
      poster: "/media/meta-robots/objectnav-couch-poster.webp",
      alt: "Navigation demonstration from the HM3D ObjectNav setting: first-person RGB, semantic segmentation, depth, and top-down maps while the agent searches for a couch.",
      badge: "demo · a single episode",
    },
    callouts: [
      { label: "first-person RGB", x: 0, y: 5.3, w: 23.7, h: 47 },
      { label: "semantic segmentation", x: 23.9, y: 5.3, w: 23.7, h: 47 },
      { label: "top-down map + path", x: 63.5, y: 10, w: 29, h: 42 },
      { label: "VLM room reasoning", x: 65, y: 53.5, w: 26, h: 42 },
    ],
    inProgress: true,
    recognition: [],
    overview: [
      "Meta-Robots extends Meta-Harness from language-based systems to embodied ObjectNav. It asks how an agentic system can diagnose navigation failures, hypothesise their causes, implement interventions, and evaluate the effect.",
      "The work lives in simulated 3D environments and touches perception, planning, and navigation. It improves the surrounding system (the harness); it does not retrain model weights or introduce a new trained world model.",
    ],
    contributions: [
      { title: "Agentic improvement framework", body: "A research and evaluation loop for proposing and testing modifications to an embodied navigation system." },
      { title: "Two-phase proposal architecture", body: "Structured hypothesis generation is separated from constrained implementation." },
      { title: "Failure analysis", body: "Trajectory telemetry, behavioural fingerprinting, cross-scene failure analysis, and Qwen2.5-VL visual criticism grounded in execution logs." },
      { title: "ObjectNav evaluation", body: "Built around the ASCENT baseline in Habitat / HM3D." },
    ],
    results: [
      { value: "65.4%", label: "baseline success", note: "ASCENT" },
      { value: "68.9%", label: "final success", note: "HM3D ObjectNav" },
      { value: "+3.5 pp", label: "absolute improvement" },
      { value: "≈5.4%", label: "relative improvement" },
    ],
    resultsNote: "Absolute change is in percentage points; the relative figure is the same change as a share of the baseline. The precise HM3D evaluation split and conditions are pending confirmation.",
    verify: [
      "Exact HM3D evaluation split and conditions for 65.4% → 68.9%",
      "Episode metadata for the couch demo (scene TEEsavR23oF, episode 2, SPL 0.86, soft SPL 0.85, 88 steps) from the original evaluation logs",
      "DSO approval to publish the demo video externally",
    ],
  },
  {
    slug: "sindex",
    name: "SINDEX",
    tagline: "Multimodal Misinformation Verification",
    affiliation: "DSO National Laboratories",
    period: "Feb 2023 – Feb 2024",
    homeBlurb: "Fact-checking that shows its work: it retrieves live news evidence, checks whether a claim and its image really fit together, and tells misinformation, satire and out-of-context images apart, built for Singapore's context.",
    highlight: "95.2% F1 · IRC-SET Best Paper",
    honour: "Recognised by Singapore's Minister of Defence",
    coauthors: ["Ashley Goh Rou Hui"],
    stats: [
      { value: "95.2%", label: "verification F1" },
      { value: "93.2%", label: "satire detection F1" },
    ],
    lead: {
      kind: "art",
      src: "sindex",
      alt: "Schematic of SINDEX: a claim and its image trigger a live news evidence search; the evidence feeds checks for truthfulness, satire and out-of-context images, ending in a verdict with an explanation.",
    },
    paper: { pages: 10, dir: "/media/sindex/paper", title: "Chat, is this real? mm-DoubleConfirm! : A Multimodal Network for Singapore-context Misinformation Detection" },
    figures: [
      { kind: "image", src: "/media/sindex/fig-pipeline.webp", alt: "The SINDEX pipeline: evidence retrieval, claim verification, satire detection, out-of-context image detection and explanation generation.", caption: "The full SINDEX pipeline, from claim and image to verdict and explanation." },
      { kind: "image", src: "/media/sindex/fig-retrieval.webp", alt: "Automated evidence retrieval: keyword extraction, NER and stop-word removal, a NewsAPI query, SBERT similarity over 25 articles, then a relevance score to pick the six most relevant sentences.", caption: "Automated evidence retrieval: keywords → news search → similarity filter → relevance filter → six evidence sentences." },
      { kind: "image", src: "/media/sindex/fig-ctc.webp", alt: "The CLIP multimodal Custom Truthfulness Classifier: claim, image and text evidence are encoded with CLIP, attention gives stance representations, and a small classifier predicts truthfulness.", caption: "The CLIP-based Custom Truthfulness Classifier: claim, image and evidence attend to one another before classification." },
      { kind: "image", src: "/media/sindex/fig-satire.webp", alt: "The satire detector: a fine-tuned BERT with its last two layers unfrozen, followed by dropout and a linear layer.", caption: "The satire detector: BERT with layers 10 and 11 unfrozen, then dropout and a linear classifier." },
    ],
    recognition: [
      "IRC-SET Best Paper Award",
      "Springer publication",
      "National STEM Talent Search: Top 8 Overall; Top Computer Science Finalist",
      "Additional national research awards",
      "Recognised by Singapore's Minister of Defence",
    ],
    overview: [
      "SINDEX is an end-to-end multimodal misinformation detector built for Singapore's social and linguistic context. Given a claim and the image shared with it, it retrieves fresh news evidence, decides whether the claim holds up, flags satire, checks whether the image is being used out of context, and explains its verdict in plain language.",
      "The paper is titled \"Chat, is this real? mm-DoubleConfirm!\" and was written with Ashley Goh Rou Hui.",
    ],
    motivation: [
      "Misinformation now travels as text and images together. Photos lend a claim \"truthiness\", out-of-context images are highly persuasive, and satire adds irony and exaggeration on top. People are not reliably good at spotting it: in a survey the paper cites, four in five Singaporeans were confident they could identify fake news, yet about 90% misidentified at least one of five false headlines.",
      "Existing automated fact-checkers fall short. The paper notes that none addresses Singapore-context misinformation, end-to-end systems are scarce, most only output true or false, they are trained on fixed datasets with limited topics, and evidence retrieval is not automated, which makes them impractical in the real world.",
    ],
    problem: [
      "Given a claim and an accompanying image, predict whether it is true or false, say whether it is satire, say whether the image is used out of context, and give an explanation a reader can follow, all grounded in up-to-date evidence.",
    ],
    approach: [
      { title: "Automated evidence retrieval", body: "A keyword-extraction transformer (H2-keywordextractor) pulls keywords from the claim; named-entity recognition keeps names, places and time phrases, and stop words are dropped. The keywords query NewsAPI, giving a live evidence bank over 80,000 news sources. SBERT embeds the keywords and each article, and the 25 most similar articles are re-scored by their similarity to the whole claim. From the top three, the two sentences closest to the claim form the evidence." },
      { title: "Claim verification: CLIP classifier", body: "A Custom Truthfulness Classifier encodes the claim, image and text evidence with CLIP. Attention between evidence and the claim, and between evidence and the image, yields stance representations. Two fully connected layers with a ReLU and a sigmoid output give a binary verdict, trained with binary cross-entropy on the Singapore dataset." },
      { title: "Claim verification: parallel LLM system", body: "A second, parallel system prompts ChatGPT-4-32k with the claim, context from Wikipedia articles on each keyword, and the same retrieved news evidence, and asks for a true or false label with reasoning." },
      { title: "Satire detection", body: "A fine-tuned bert-base-uncased binary classifier (satire or not), trained on balanced satirical and non-satirical fake claims. Only BERT layers 10 and 11 are unfrozen; inputs are padded to 512 tokens, with dropout and a linear sigmoid head, Adam, binary cross-entropy and 100 epochs." },
      { title: "Out-of-context image detection", body: "The pretrained COSMOS model (self-supervised out-of-context detection) is used. Its dataset-preparation code was not released, so SINDEX re-implements that stage with custom code: spaCy NER for entities and modified captions, SBERT for similarity, and detectron2 for bounding boxes, together with a reverse image search caption from Google Cloud Vision." },
      { title: "Explanation generation", body: "ChatGPT-4-32k is prompted with the claim, its truthfulness and satire labels, and the retrieved evidence, and asked for a reasoning explanation that cites that evidence." },
    ],
    contributions: [
      { title: "Singapore multimodal dataset", body: "A large original dataset of Singapore-context claim-image sets, collected, cleaned and manually annotated (117 hours of annotation), plus a Singapore-context satire dataset." },
      { title: "Evidence retrieval and verification", body: "An automated framework that retrieves live news evidence and verifies claims against it, instead of relying on a fixed evidence bank." },
      { title: "Custom satire detector", body: "A text classifier that separates satire from non-satirical fake claims, so exaggerated content is not mistaken for malicious misinformation." },
      { title: "Multistage model", body: "A pipeline that combines a pretrained out-of-context image detector with large language models for zero-shot prediction and explanation." },
    ],
    setup: [
      "Verification dataset: 295 Singapore-context claim-image sets, collected from Black Dot Research, Factually, Facebook and WhatsApp for false and misleading claims, and from The Straits Times and CNA for true examples. 80/20 train-test split.",
      "Satire dataset: 184 Singapore-context satirical claims (written with ChatGPT's help) and 104 non-satirical fake claims, combined with 203 satirical and 283 non-satirical articles from an external dataset, balanced between satire and non-satire. 80/20 split.",
      "Evidence retrieval benchmark: evidence collected by hand for 10 claims, compared with six module-retrieved sentences per claim (60 in total).",
      "Metrics: precision, recall, accuracy and F1 for classification.",
    ],
    results: [
      { value: "95.2%", label: "F1", note: "CLIP truthfulness classifier" },
      { value: "95.4%", label: "F1", note: "ChatGPT system, with evidence" },
      { value: "93.2%", label: "F1", note: "satire detection" },
      { value: "58 / 60", label: "evidence sentences", note: "matched the hand-picked ones" },
    ],
    resultsNote: "Figures are from the paper. Table 1 is reproduced from it.",
    resultsExtra: [
      "Evidence retrieval: filtering by similarity alone left 65% of the 60 selected sentences irrelevant. Adding the second filter, relevance to the whole claim, brought it to 58 of 60 matching the hand-picked ones; the remaining differences were in phrasing rather than meaning.",
      "Evidence is what makes the LLM system work. Without it the ChatGPT system reached only 62.9% F1, mostly guessing from how credible the claimed source sounded; with retrieved evidence it reached 95.4% F1 and made two errors, both with correct explanations but mislabelled.",
      "Explanations were evaluated against hand-written gold explanations. In the paper's example, the generated explanation reaches the same conclusion as the gold one: that a claim about road closures is false because the news evidence says the road will be closed.",
    ],
    tables: [
      {
        title: "ChatGPT-4-32k misinformation detection, with and without retrieved evidence",
        caption: "Same test set as the CLIP classifier. Adding evidence is what lifts the system.",
        columns: ["Metric", "Without evidence", "With evidence"],
        rows: [
          ["Precision", "0.595", "0.969"],
          ["Recall", "0.667", "0.939"],
          ["Accuracy", "0.621", "0.954"],
          ["F1-score", "0.628", "0.954"],
        ],
        highlight: [3],
      },
    ],
    verify: [
      "The 83.1% out-of-context F1 on the CV is not in the paper. The paper only reports that COSMOS was found suitable for domain transfer. Left off the page until the source is confirmed.",
      "Explanation-generation scores disagree within the paper: the abstract gives BLEU 0.361, METEOR 0.450, CIDEr 0.001, ROUGE 0.609, while section 6.4 gives BLEU 0.841, METEOR 0.845, ROUGE 0.913. No numbers are shown on the page.",
      "Paper lists Raffles Institution as Felicia's affiliation; the page says DSO National Laboratories, as on the CV.",
      "Publication details and link for the Springer paper; the paper's own table numbering is inconsistent (Table 1, then Table 6).",
      "Co-author credit: Ashley Goh Rou Hui (River Valley High School), per the paper.",
    ],
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
