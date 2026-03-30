import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, Download, RotateCcw, Play, CheckCircle2, XCircle, AlertTriangle, User, FileQuestion, ChevronLeft, ChevronRight } from "lucide-react";

const questions = [
  {
    question: "An economy’s gross domestic product is …..",
    options: [
      "the excess of spending over income.",
      "the excess of income over spending.",
      "total income and total spending.",
      "total spending as a percent of total income."
    ],
    answer: 2
  },
  {
    question: "Kamola bakes a cake and sells it to Normurod for $10. Samandar pays Dilnoza $30 to tutor him. In this economy, GDP is …..",
    options: ["$10", "$20", "$30", "$40"],
    answer: 3
  },
  {
    question: "Which of the following is the largest component of GDP?",
    options: ["consumption", "investment", "government purchases", "net exports"],
    answer: 0
  },
  {
    question: "The four components of GDP in the expenditure approach are:",
    options: [
      "wages, interest, rent, profit",
      "production, income, spending, savings",
      "consumption, investment, government purchases, net exports",
      "consumption, net export, wages, investment, government purchases"
    ],
    answer: 2
  },
  {
    question: "The difference between nominal GDP and real GDP is:",
    options: [
      "Nominal GDP is adjusted for inflation, real GDP is not",
      "Real GDP is adjusted for inflation, nominal GDP is not",
      "Nominal GDP measures only production, real GDP includes services",
      "Real GDP excludes government spending"
    ],
    answer: 1
  },
  {
    question: "If a country’s nominal GDP increases while its real GDP remains unchanged, what has likely happened?",
    options: ["The economy has grown", "Inflation has increased", "More goods and services have been produced", "The unemployment rate has fallen"],
    answer: 1
  },
  {
    question: "Which type of goods are excluded from GDP to avoid double counting?",
    options: ["Final goods", "Durable goods", "Intermediate goods", "Imported goods"],
    answer: 2
  },
  {
    question: "If a country's GDP grows at 5% per year, approximately how long will it take for GDP to double?",
    options: ["10 years", "14 years", "24 years", "35 years"],
    answer: 1
  },
  {
    question: "What is the most commonly used measure of the cost of living?",
    options: ["GDP deflator", "Consumer price index", "Producer price index", "Unemployment rate"],
    answer: 1
  },
  {
    question: "The Consumer price index (CPI) measures:",
    options: [
      "The total value of goods and services produced within a country's economy",
      "The overall amount of money people spend on products and services",
      "A statistical measure of how prices change over time in the consumer market",
      "The fluctuation in costs of key raw materials used in production"
    ],
    answer: 2
  },
  {
    question: "What is the inflation rate if the CPI was 120 last year and is 126 this year?",
    options: ["4%", "5%", "6%", "10%"],
    answer: 1
  },
  {
    question: "If nominal interest rates are 8% and inflation is 3%, what is the real interest rate?",
    options: ["3%", "5%", "8%", "11%"],
    answer: 1
  },
  {
    question: "What does productivity measure in an economy?",
    options: [
      "The overall size of the workforce in an economy",
      "The level of production achieved relative to the amount of labor used",
      "The total supply of money available within an economic system",
      "The total area of land designated for agricultural activities"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a key factor that determines a nation’s standard of living?",
    options: [
      "The amount of money printed by the government",
      "The country’s level of productivity",
      "The number of government regulations",
      "The total number of factories"
    ],
    answer: 1
  },
  {
    question: "Human capital refers to:",
    options: [
      "The structures, tools, and equipment involved in the production process",
      "The abilities, expertise, and training that individuals gain over time",
      "The overall quantity of financial resources circulating in an economy",
      "The total number of people residing within a nation"
    ],
    answer: 1
  },
  {
    question: "What is foreign direct investment?",
    options: [
      "When a foreign firm builds a business in another country",
      "When a country sells goods to foreign buyers through trade",
      "When workers move to another country for temporary jobs",
      "When banks exchange money between different countries"
    ],
    answer: 0
  },
  {
    question: "Why are property rights important for economic growth?",
    options: [
      "They give firms confidence that their resources will be protected",
      "They require firms to hire more workers for every production stage",
      "They ensure that prices stay the same even when markets change",
      "They force producers to sell goods only to domestic consumers"
    ],
    answer: 0
  },
  {
    question: "What is the financial system?",
    options: [
      "A network of banks controlled by the government",
      "A group of institutions that help match savings with investments",
      "A system used only by businesses to track their income",
      "A method of printing money in an economy"
    ],
    answer: 1
  },
  {
    question: "What is the main function of the bond market?",
    options: [
      "Enabling authorities to generate revenue by adjusting tax rates on individuals and businesses",
      "Providing businesses and governments with a way to borrow money",
      "Acting as a secure facility for safeguarding precious metals on behalf of investors",
      "Establishing the official exchange rate and overall worth of the national currency"
    ],
    answer: 1
  },
  {
    question: "The equation for national saving in a closed economy is:",
    options: ["S = C + I + G", "S = Y - C - G", "S = I + NX", "S = T + G"],
    answer: 1
  },
  {
    question: "What is the crowding-out effect?",
    options: [
      "When private investment increases due to lower interest rates",
      "When government borrowing reduces the funds available for private investment",
      "When stock prices increase due to high demand in the economy",
      "When savers invest more money in government bonds than in private stocks"
    ],
    answer: 1
  },
  {
    question: "What is present value?",
    options: [
      "The specific amount of funds currently held within a personal savings account",
      "The current worth of a future sum of money discounted for interest rates",
      "The overall financial worth of various assets circulating within an economic system",
      "The projected accumulation of capital after being placed into an investment over time"
    ],
    answer: 1
  },
  {
    question: "How does diversification reduce financial risk?",
    options: [
      "By concentrating investment in a single asset",
      "By spreading investments across multiple assets",
      "By avoiding the stock market entirely",
      "By investing only in government bonds"
    ],
    answer: 1
  },
  {
    question: "How is the unemployment rate calculated?",
    options: [
      "(Number of employed / Labor force) × 100",
      "(Number of unemployed / Adult population) × 100",
      "(Number of unemployed / Labor force) × 100",
      "(Labor force / Adult population) × 100"
    ],
    answer: 2
  },
  {
    question: "The labor force consists of:",
    options: [
      "All people in the country, including children",
      "Only those who have a job",
      "The total number of employed and unemployed workers",
      "Only people who are actively looking for jobs"
    ],
    answer: 2
  },
  {
    question: "If a person is unemployed because they are in between jobs, this is known as:",
    options: ["Structural unemployment", "Cyclical unemployment", "Frictional unemployment", "Natural unemployment"],
    answer: 2
  },
  {
    question: "What is money?",
    options: [
      "Any physical material or resource that holds measurable economic worth",
      "Any item that is widely accepted as payment for goods and services",
      "Only precious metals, such as gold and silver, traditionally used as a store of value",
      "The overall financial assets and resources available within a nation's economic system"
    ],
    answer: 1
  },
  {
    question: "Which of the following is NOT a function of money?",
    options: ["Medium of exchange", "Store of value", "Unit of account", "Source of economic growth"],
    answer: 3
  },
  {
    question: "Which institution is primarily responsible for controlling the money supply in Uzbekistan?",
    options: ["Oliy Majlis", "Central Bank", "The Ministry of Economy and Finance", "President"],
    answer: 1
  },
  {
    question: "What is inflation?",
    options: [
      "An increase in the overall price level of goods and services",
      "A decrease in the value of money spent on goods and services",
      "An increase in level of production of goods and services",
      "A reduction in interest rates paid for loans"
    ],
    answer: 0
  },
  {
    question: "What is the primary cause of long-term inflation?",
    options: [
      "Supply chain disruptions among countries",
      "Government taxation policies for the producers",
      "Excessive growth in the money supply",
      "Rising oil prices imported from other countries"
    ],
    answer: 2
  },
  {
    question: "Which group benefits from unexpected inflation?",
    options: ["Lenders", "Fixed-income earners", "Borrowers", "Retirees"],
    answer: 2
  },
  {
    question: "What does the term credit crunch describe?",
    options: ["Sharp fall in bank lending", "Rapid growth of bank deposits", "Increase in government borrowing", "Decline in stock market prices"],
    answer: 0
  },
  {
    question: "In the model of aggregate demand and aggregate supply, the quantity of ________ is on the horizontal axis, and the ________ is on the vertical axis.",
    options: ["output; interest rate", "output; price level", "money; interest rate", "money; price level"],
    answer: 1
  },
  {
    question: "What does the aggregate demand curve show?",
    options: [
      "The total quantity of goods and services produced in an economy at different price levels",
      "The total quantity of goods and services demanded at different price levels",
      "The relationship between inflation and unemployment",
      "The demand for only consumer goods in an economy"
    ],
    answer: 1
  },
  {
    question: "The long-run aggregate supply (LRAS) curve is:",
    options: ["Upward sloping", "Downward sloping", "Vertical", "Horizontal"],
    answer: 2
  },
  {
    question: "Stagflation is caused by:",
    options: [
      "An increase in aggregate demand for goods and services",
      "A leftward shift in the short-run aggregate supply curve",
      "A decrease in government spending",
      "A rightward shift in the aggregate supply curve"
    ],
    answer: 1
  },
  {
    question: "The short-run trade-off between inflation and unemployment is represented by:",
    options: ["The aggregate demand curve", "The Phillips curve", "The production possibilities frontier", "The supply and demand model"],
    answer: 1
  },
  {
    question: "In the long run, the Phillips curve is:",
    options: ["Upward sloping", "Downward sloping", "Vertical", "Horizontal"],
    answer: 2
  }
];

const timerOptions = [10, 15, 20, 30, 45, 60, 90];

const shuffleArray = (items) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const toCsvCell = (value) => {
  const safe = String(value ?? "").replace(/"/g, '""');
  return `"${safe}"`;
};

export default function EconomicsQuizWebsite() {
  const [phase, setPhase] = useState("start");
  const [studentName, setStudentName] = useState("");
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(30 * 60);
  const [startedAt, setStartedAt] = useState(null);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState(false);
  const intervalRef = useRef(null);

  const totalQuestions = quizQuestions.length;
  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => typeof value === "number").length,
    [answers]
  );
  const unansweredCount = Math.max(totalQuestions - answeredCount, 0);
  const progressValue = totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const warningThreshold = 5 * 60;
  const isWarning = remainingSeconds <= warningThreshold;

  const summary = useMemo(() => {
    if (!quizQuestions.length) {
      return {
        correct: 0,
        incorrect: 0,
        percent: 0,
        timeUsed: 0,
        results: []
      };
    }

    const results = quizQuestions.map((q, index) => {
      const selectedIndex = answers[index];
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        question: q.question,
        selectedAnswer: typeof selectedIndex === "number" ? q.options[selectedIndex] : "",
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        selectedIndex,
        correctIndex: q.correctIndex
      };
    });

    const correct = results.filter((item) => item.isCorrect).length;
    const incorrect = quizQuestions.length - correct;
    const totalDurationSeconds = Number(durationMinutes) * 60;
    const timeUsed = submittedAt && startedAt
      ? Math.max(0, Math.round((submittedAt - startedAt) / 1000))
      : Math.max(0, totalDurationSeconds - remainingSeconds);

    return {
      correct,
      incorrect,
      percent: Math.round((correct / quizQuestions.length) * 100),
      timeUsed,
      results
    };
  }, [answers, durationMinutes, quizQuestions, remainingSeconds, startedAt, submittedAt]);

  useEffect(() => {
    if (phase !== "test") return undefined;

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current);
          setIsAutoSubmitted(true);
          setPhase("results");
          setSubmittedAt(Date.now());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [phase]);

  const preparedQuestions = useMemo(() => {
    const base = questions.map((q, index) => {
      let options = [...q.options];
      let correctIndex = q.answer;

      if (shuffleAnswers) {
        const mapped = q.options.map((option, optionIndex) => ({
          text: option,
          isCorrect: optionIndex === q.answer
        }));
        const shuffledMapped = shuffleArray(mapped);
        options = shuffledMapped.map((item) => item.text);
        correctIndex = shuffledMapped.findIndex((item) => item.isCorrect);
      }

      return {
        id: `q-${index + 1}`,
        question: q.question,
        options,
        correctIndex
      };
    });

    return shuffleQuestions ? shuffleArray(base) : base;
  }, [shuffleAnswers, shuffleQuestions]);

  const startQuiz = () => {
    const duration = Number(durationMinutes) * 60;
    setQuizQuestions(preparedQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setRemainingSeconds(duration);
    setStartedAt(Date.now());
    setSubmittedAt(null);
    setIsAutoSubmitted(false);
    setPhase("test");
  };

  const submitQuiz = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setSubmittedAt(Date.now());
    setPhase("results");
  };

  const restartQuiz = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setPhase("start");
    setAnswers({});
    setCurrentIndex(0);
    setQuizQuestions([]);
    setRemainingSeconds(Number(durationMinutes) * 60);
    setStartedAt(null);
    setSubmittedAt(null);
    setIsAutoSubmitted(false);
  };

  const handleSelectAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportCsv = () => {
    const rows = [
      ["Student Name", studentName || "Anonymous"],
      ["Quiz Title", "Economics Theory Test"],
      ["Total Questions", String(quizQuestions.length)],
      ["Correct", String(summary.correct)],
      ["Incorrect", String(summary.incorrect)],
      ["Percent", `${summary.percent}%`],
      ["Time Used", formatTime(summary.timeUsed)],
      [],
      ["#", "Question", "Selected Answer", "Correct Answer", "Correct"]
    ];

    summary.results.forEach((item, index) => {
      rows.push([
        String(index + 1),
        item.question,
        item.selectedAnswer || "No answer",
        item.correctAnswer,
        item.isCorrect ? "Yes" : "No"
      ]);
    });

    const csvContent = rows
      .map((row) => row.map((cell) => toCsvCell(cell)).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = (studentName || "student").trim().replace(/\s+/g, "-").toLowerCase();
    link.download = `economics-quiz-results-${safeName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentQuestion = quizQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {phase === "start" && (
          <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
            <Card className="w-full rounded-3xl border-slate-200 shadow-xl">
              <CardHeader className="space-y-4 pb-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full px-3 py-1 text-sm">Economics Test</Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
                    {questions.length} Questions
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Economics Theory Quiz
                </CardTitle>
                <CardDescription className="text-base leading-7 text-slate-600">
                  One question at a time, full review mode after submission, timer support, CSV export, and mobile-friendly navigation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="studentName" className="text-sm font-medium">
                      Student Name (optional)
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter student name"
                        className="h-11 rounded-2xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Timer Duration</Label>
                    <Select value={durationMinutes} onValueChange={setDurationMinutes}>
                      <SelectTrigger className="h-11 rounded-2xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {timerOptions.map((minutes) => (
                          <SelectItem key={minutes} value={String(minutes)}>
                            {minutes} minutes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <FileQuestion className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">Test Setup</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="shuffleQuestions"
                          checked={shuffleQuestions}
                          onCheckedChange={(checked) => setShuffleQuestions(Boolean(checked))}
                        />
                        <Label htmlFor="shuffleQuestions" className="cursor-pointer text-sm text-slate-700">
                          Shuffle questions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="shuffleAnswers"
                          checked={shuffleAnswers}
                          onCheckedChange={(checked) => setShuffleAnswers(Boolean(checked))}
                        />
                        <Label htmlFor="shuffleAnswers" className="cursor-pointer text-sm text-slate-700">
                          Shuffle answer choices
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Card className="rounded-2xl border-slate-200 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-500">Questions</div>
                      <div className="mt-1 text-2xl font-bold">{questions.length}</div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-slate-200 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-500">Timer</div>
                      <div className="mt-1 text-2xl font-bold">{durationMinutes} min</div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-slate-200 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-500">Mode</div>
                      <div className="mt-1 text-2xl font-bold">Frontend</div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={startQuiz}
                  className="h-12 w-full rounded-2xl text-base font-semibold shadow-lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Test
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {phase === "test" && currentQuestion && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <div className="sticky top-4 z-20 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="rounded-full px-3 py-1">Question {currentIndex + 1} of {totalQuestions}</Badge>
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Answered {answeredCount}/{totalQuestions}
                      </Badge>
                      {unansweredCount > 0 && (
                        <Badge variant="outline" className="rounded-full px-3 py-1">
                          Unanswered {unansweredCount}
                        </Badge>
                      )}
                    </div>
                    <Progress value={progressValue} className="h-2.5 rounded-full" />
                  </div>

                  <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${isWarning ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                    {isWarning ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    <span>{formatTime(remainingSeconds)}</span>
                  </div>
                </div>
              </div>

              <Card className="rounded-3xl border-slate-200 shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-semibold leading-8 sm:text-2xl">
                        {currentQuestion.question}
                      </CardTitle>
                      <CardDescription className="mt-2 text-sm text-slate-500">
                        Select one answer.
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0 rounded-full px-3 py-1">
                      {answers[currentIndex] !== undefined ? "Answered" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentQuestion.options.map((option, optionIndex) => {
                    const isSelected = answers[currentIndex] === optionIndex;
                    return (
                      <button
                        key={`${currentQuestion.id}-${optionIndex}`}
                        type="button"
                        onClick={() => handleSelectAnswer(optionIndex)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all ${isSelected ? "border-slate-900 bg-slate-900 text-white shadow-md" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isSelected ? "bg-white text-slate-900" : "bg-slate-100 text-slate-700"}`}>
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <div className="text-sm leading-7 sm:text-base">{option}</div>
                        </div>
                      </button>
                    );
                  })}

                  <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl"
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl"
                        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
                        disabled={currentIndex === totalQuestions - 1}
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="rounded-2xl">Submit Test</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Submit your test?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You have answered {answeredCount} out of {totalQuestions} questions. Unanswered questions will be marked incorrect.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="rounded-2xl" onClick={submitQuiz}>
                            Final Submit
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-3xl border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Question Palette</CardTitle>
                  <CardDescription>
                    Jump directly to any question.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
                    {quizQuestions.map((_, index) => {
                      const isActive = index === currentIndex;
                      const isAnswered = answers[index] !== undefined;
                      return (
                        <button
                          key={`nav-${index}`}
                          type="button"
                          onClick={() => jumpToQuestion(index)}
                          className={`flex h-11 w-full items-center justify-center rounded-2xl border text-sm font-semibold transition ${isActive ? "border-slate-900 bg-slate-900 text-white" : isAnswered ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full bg-slate-900" /> Current
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" /> Answered
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full bg-slate-300" /> Unanswered
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Live Summary</CardTitle>
                  <CardDescription>Quick test status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Total</span>
                    <span className="font-semibold">{totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700">
                    <span>Answered</span>
                    <span className="font-semibold">{answeredCount}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3 text-amber-700">
                    <span>Unanswered</span>
                    <span className="font-semibold">{unansweredCount}</span>
                  </div>
                  <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${isWarning ? "bg-red-50 text-red-700" : "bg-slate-50"}`}>
                    <span>Time Left</span>
                    <span className="font-semibold">{formatTime(remainingSeconds)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
              <Card className="rounded-3xl border-slate-200 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-2xl">Results</CardTitle>
                    {isAutoSubmitted && (
                      <Badge variant="destructive" className="rounded-full px-3 py-1">
                        Auto-submitted
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {studentName ? `${studentName}'s score summary` : "Quiz score summary"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-3xl bg-slate-900 p-6 text-white">
                    <div className="text-sm text-slate-300">Total Score</div>
                    <div className="mt-2 text-4xl font-bold">{summary.percent}%</div>
                    <div className="mt-2 text-sm text-slate-300">
                      {summary.correct} correct out of {quizQuestions.length}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                      <div className="text-sm">Correct</div>
                      <div className="mt-1 text-2xl font-bold">{summary.correct}</div>
                    </div>
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                      <div className="text-sm">Incorrect</div>
                      <div className="mt-1 text-2xl font-bold">{summary.incorrect}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm text-slate-500">Time Used</div>
                      <div className="mt-1 text-2xl font-bold">{formatTime(summary.timeUsed)}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm text-slate-500">Student</div>
                      <div className="mt-1 truncate text-lg font-semibold">{studentName || "Anonymous"}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button onClick={exportCsv} className="rounded-2xl">
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV Results
                    </Button>
                    <Button onClick={restartQuiz} variant="outline" className="rounded-2xl">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restart / Retake
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Review Mode</CardTitle>
                  <CardDescription>
                    Correct answers are shown in green. Wrong selections are shown in red.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quizQuestions.map((q, index) => {
                    const selectedIndex = answers[index];
                    const hasAnswered = typeof selectedIndex === "number";
                    const isCorrect = selectedIndex === q.correctIndex;

                    return (
                      <div key={q.id} className="rounded-3xl border border-slate-200 p-5">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="text-sm font-medium text-slate-500">Question {index + 1}</div>
                            <h3 className="mt-1 text-lg font-semibold leading-8">{q.question}</h3>
                          </div>
                          {hasAnswered ? (
                            isCorrect ? (
                              <Badge className="rounded-full bg-emerald-600 px-3 py-1 hover:bg-emerald-600">
                                <CheckCircle2 className="mr-1 h-4 w-4" /> Correct
                              </Badge>
                            ) : (
                              <Badge className="rounded-full bg-red-600 px-3 py-1 hover:bg-red-600">
                                <XCircle className="mr-1 h-4 w-4" /> Incorrect
                              </Badge>
                            )
                          ) : (
                            <Badge variant="outline" className="rounded-full px-3 py-1">
                              No answer
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-3">
                          {q.options.map((option, optionIndex) => {
                            const isUserChoice = selectedIndex === optionIndex;
                            const isRightAnswer = q.correctIndex === optionIndex;

                            let itemClass = "border-slate-200 bg-white text-slate-700";
                            if (isRightAnswer) itemClass = "border-emerald-200 bg-emerald-50 text-emerald-800";
                            if (isUserChoice && !isRightAnswer) itemClass = "border-red-200 bg-red-50 text-red-800";

                            return (
                              <div key={`${q.id}-review-${optionIndex}`} className={`rounded-2xl border p-4 ${itemClass}`}>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-semibold">
                                      {String.fromCharCode(65 + optionIndex)}
                                    </div>
                                    <div className="text-sm leading-7 sm:text-base">{option}</div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {isRightAnswer && <Badge className="rounded-full bg-emerald-600 hover:bg-emerald-600">Correct answer</Badge>}
                                    {isUserChoice && <Badge className={`rounded-full ${isRightAnswer ? "bg-emerald-700 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-600"}`}>Your answer</Badge>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
