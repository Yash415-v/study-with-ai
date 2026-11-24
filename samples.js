/**
 * Studley AI - Preloaded High-Yield Sample Study Packs
 * Enables instant 1-click demo on GitHub Pages and offline mode
 */
const SAMPLE_PACKS = {
  "os_csci": {
    "title": "Operating Systems & Concurrency (CS 301)",
    "summary": "High-yield concepts on Process Scheduling, Deadlocks, Virtual Memory Paging, and Semaphores designed for last-minute cramming.",
    "readTime": "6 mins",
    "wordCount": 1850,
    "flashcards": [
      {
        "id": 1,
        "front": "What are the 4 Coffman conditions required for a Deadlock to occur?",
        "back": "1. Mutual Exclusion (only one process holds resource)\n2. Hold and Wait (holding one while waiting for another)\n3. No Preemption (resources cannot be forcibly taken)\n4. Circular Wait (a circular chain of waiting processes).\nBreaking ANY one prevents deadlock!",
        "category": "Deadlocks",
        "difficulty": "Hard",
        "examTip": "Very common 5-mark question! Remember mnemonic: 'Mutual Hold No Circle'."
      },
      {
        "id": 2,
        "front": "Differentiate between Preemptive vs Non-Preemptive Scheduling.",
        "back": "Preemptive: CPU can be taken away from a running process before it finishes (e.g., Round Robin, SRTF). Better response time for interactive systems.\nNon-Preemptive: Process holds the CPU until it terminates or blocks for I/O (e.g., FCFS, SJF). No context-switching overhead.",
        "category": "CPU Scheduling",
        "difficulty": "Medium",
        "examTip": "Examiners love asking for Gantt chart comparisons between SRTF and SJF."
      },
      {
        "id": 3,
        "front": "Explain the difference between a Process and a Thread.",
        "back": "A Process is an independent execution unit with its own virtual address space, memory, and file descriptors. Heavyweight creation.\nA Thread ('lightweight process') exists within a process, sharing code, data, and heap, but has its own stack and program counter. Cheap context switching.",
        "category": "Processes",
        "difficulty": "Easy",
        "examTip": "Always mention what is shared (Heap/Data/Files) vs private (Stack/Registers)."
      },
      {
        "id": 4,
        "front": "What is Thrashing in Virtual Memory and how is it resolved?",
        "back": "Thrashing occurs when the system spends more time swapping pages in/out of disk than executing instructions because the sum of working sets exceeds available RAM.\nSolution: Decrease the degree of multiprogramming (suspend low priority processes) or allocate more physical frames.",
        "category": "Memory Management",
        "difficulty": "Hard",
        "examTip": "Draw the CPU utilization vs Multiprogramming curve: peaks and then drops sharply."
      },
      {
        "id": 5,
        "front": "What is a Counting Semaphore vs Binary Semaphore (Mutex)?",
        "back": "Binary Semaphore (Mutex): Value is 0 or 1. Used strictly for mutual exclusion in critical sections.\nCounting Semaphore: Value can be an integer >= 0, representing the count of available identical resources (e.g., buffer slots in Producer-Consumer).",
        "category": "Synchronization",
        "difficulty": "Medium",
        "examTip": "Remember: wait() decrements semaphore; signal() increments it."
      },
      {
        "id": 6,
        "front": "What is Belady's Anomaly and which page replacement algorithm suffers from it?",
        "back": "Belady's Anomaly is the counter-intuitive phenomenon where increasing the number of page frames results in MORE page faults for a given memory access pattern.\nFIFO suffers from Belady's Anomaly. Stack algorithms (like LRU and Optimal) never suffer from it.",
        "category": "Memory Management",
        "difficulty": "Medium",
        "examTip": "Guaranteed 2-mark quiz question. Never say LRU has Belady's!"
      }
    ],
    "audioScript": {
      "title": "Night Before OS Exam: 7-Minute High-Yield Cram Session",
      "host": "Alex",
      "cohost": "Prof. Taylor",
      "segments": [
        {
          "speaker": "Alex",
          "text": "Welcome to your night-before Operating Systems cram review! Exam is in less than 24 hours, so no fluff—just the guaranteed questions you will see on the paper.",
          "topic": "Introduction"
        },
        {
          "speaker": "Prof. Taylor",
          "text": "Exactly, Alex. If you remember nothing else, drill the four Coffman conditions for Deadlock into your brain right now. Mutual exclusion, hold and wait, no preemption, and circular wait. Break any one, and deadlock is mathematically impossible.",
          "topic": "Coffman Conditions"
        },
        {
          "speaker": "Alex",
          "text": "And professors always ask how Banker's algorithm fits into this. What's the short answer?",
          "topic": "Banker's Algorithm"
        },
        {
          "speaker": "Prof. Taylor",
          "text": "Banker's algorithm is Deadlock AVOIDANCE. It checks if granting a resource keeps the system in a 'Safe State'—meaning there is at least one sequence where every process can finish. If unsafe, the request is denied.",
          "topic": "Safe State"
        },
        {
          "speaker": "Alex",
          "text": "Next big topic: Virtual memory and Thrashing. Students always lose marks on the definition.",
          "topic": "Thrashing & Virtual Memory"
        },
        {
          "speaker": "Prof. Taylor",
          "text": "Yes! Don't just say 'memory is full.' Thrashing is when the OS spends more time swapping pages in and out of swap space than actually executing code. CPU utilization drops to almost zero. Fix it by reducing the multiprogramming level.",
          "topic": "Fixing Thrashing"
        },
        {
          "speaker": "Alex",
          "text": "What about Page Replacement algorithms? What's the trap to avoid?",
          "topic": "Page Replacement Traps"
        },
        {
          "speaker": "Prof. Taylor",
          "text": "Watch out for Belady's Anomaly! Remember: FIFO page replacement can actually produce MORE page faults when you give it MORE frames. LRU and Optimal are stack algorithms, so they are completely immune.",
          "topic": "Belady's Anomaly"
        },
        {
          "speaker": "Alex",
          "text": "One last speed tip: Threads share Heap, Global variables, and File descriptors, but have their OWN Stacks and Program Counters. Memorize that table and get a solid night's sleep!",
          "topic": "Final Exam Tips"
        }
      ]
    },
    "importantQuestions": [
      {
        "id": "q1",
        "type": "long",
        "marks": 10,
        "importance": "⭐️ Guaranteed (95% Exam Probability)",
        "question": "Explain the 4 necessary conditions for Deadlock. Describe how Deadlock Prevention differs from Deadlock Avoidance with Banker's Algorithm.",
        "modelAnswer": "Deadlock requires 4 simultaneous Coffman conditions:\n1. Mutual Exclusion: At least one resource held non-shareably.\n2. Hold and Wait: A process holds resources while requesting additional ones.\n3. No Preemption: Resources cannot be forcibly taken until voluntary release.\n4. Circular Wait: P0 waits for P1, P1 waits for P2... Pn waits for P0.\n\nPrevention vs Avoidance:\n- Deadlock Prevention: Statistically invalidates at least one of the 4 conditions at design time (e.g. impose global resource ordering to eliminate circular wait).\n- Deadlock Avoidance: Dynamically evaluates resource requests using Banker's Algorithm to guarantee that allocation maintains a 'Safe State' with at least one execution sequence satisfying remaining process needs.",
        "keyKeywords": ["Coffman conditions", "Safe State", "Banker's Algorithm", "Resource Ordering", "Circular Wait"],
        "pitfalls": "Confusing prevention (static design rules) with avoidance (dynamic state checking like Banker's)."
      },
      {
        "id": "q2",
        "type": "medium",
        "marks": 7,
        "importance": "High Yield (85% Probability)",
        "question": "What is Thrashing? Explain its cause, working set model, and two techniques to resolve it.",
        "modelAnswer": "Thrashing is a state where system throughput collapses because processes spend more time paging data between disk and main memory than executing instructions.\nCause: When the sum of active Working Sets of all concurrent processes exceeds total physical page frames.\nResolution:\n1. Suspend / swap out low priority processes to reduce the degree of multiprogramming.\n2. Page Fault Frequency (PFF) control: Dynamically allocate frames when a process exceeds the upper fault threshold.",
        "keyKeywords": ["Working Set Model", "Degree of Multiprogramming", "Page Fault Frequency", "Swap Out"],
        "pitfalls": "Failing to explain that CPU utilization drops to near zero during thrashing."
      },
      {
        "id": "q3",
        "type": "short",
        "marks": 4,
        "importance": "High Yield (90% Probability)",
        "question": "Compare Process vs Thread memory layouts. What is shared and what is private?",
        "modelAnswer": "Shared within same process:\n- Code (Text) segment\n- Data segment & Heap memory\n- Open file descriptors and OS resources\n\nPrivate to each thread:\n- Thread ID and Program Counter (PC)\n- Register set state\n- Thread-specific call stack and local variables.",
        "keyKeywords": ["Shared Heap", "Private Stack", "Program Counter", "Address Space"],
        "pitfalls": "Saying threads have private heap memory (heap is shared among all threads in a process)."
      }
    ],
    "quiz": [
      {
        "id": "mcq1",
        "question": "Which page replacement algorithm is susceptible to Belady's Anomaly?",
        "options": [
          "LRU (Least Recently Used)",
          "FIFO (First In First Out)",
          "Optimal Page Replacement",
          "LFU (Least Frequently Used)"
        ],
        "correct": 1,
        "explanation": "FIFO is not a stack algorithm, so adding more physical frames can actually cause more page faults on certain reference strings (Belady's Anomaly)."
      },
      {
        "id": "mcq2",
        "question": "Which of the following is NOT shared between threads of the same process?",
        "options": [
          "Heap memory",
          "Global variables",
          "CPU registers and execution stack",
          "Open file descriptors"
        ],
        "correct": 2,
        "explanation": "Each thread must have its own private CPU registers and call stack to maintain independent execution states."
      },
      {
        "id": "mcq3",
        "question": "Banker's Algorithm is primarily used for:",
        "options": [
          "Deadlock Detection",
          "Deadlock Recovery",
          "Deadlock Avoidance",
          "Deadlock Prevention"
        ],
        "correct": 2,
        "explanation": "Banker's algorithm performs Deadlock Avoidance by dynamically ensuring the system always remains in a 'Safe State'."
      },
      {
        "id": "mcq4",
        "question": "What is the primary purpose of a Semaphore's wait() (P) operation?",
        "options": [
          "Increments the semaphore value and wakes a sleeping thread",
          "Decrements the semaphore value; blocks if value becomes negative",
          "Resets the critical section timer",
          "Kills a deadlock-bound process"
        ],
        "correct": 1,
        "explanation": "wait() or P() atomically decrements the semaphore counter. If the value drops below zero, the calling thread blocks until another thread signals."
      }
    ],
    "cheatSheet": {
      "title": "5-Minute Night-Before Cheat Sheet: OS",
      "bulletPoints": [
        "4 Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait (break 1 = no deadlock).",
        "Banker's Algorithm = Avoidance, checks if request preserves a 'Safe State'.",
        "Thrashing = Page fault frenzy where disk swap >> CPU execution. Fix: Lower multiprogramming level.",
        "FIFO page replacement suffers from Belady's Anomaly; LRU and Optimal do NOT.",
        "Process has separate address space (heavy); Threads share code, heap, files, but have private stack and registers.",
        "Round Robin is preemptive (time slice quantum); FCFS is non-preemptive.",
        "Critical Section requirements: Mutual Exclusion, Progress, Bounded Waiting."
      ]
    }
  },
  "bio_genetics": {
    "title": "Cellular Biology & Genetics (Bio 101)",
    "summary": "High-yield revision for Cellular Respiration, Photosynthesis light reactions, DNA replication enzymes, and Mendelian genetics.",
    "readTime": "5 mins",
    "wordCount": 1600,
    "flashcards": [
      {
        "id": 1,
        "front": "What are the 3 major stages of Cellular Respiration and their ATP yields?",
        "back": "1. Glycolysis (Cytoplasm): Net 2 ATP + 2 NADH\n2. Krebs / Citric Acid Cycle (Mitochondrial Matrix): 2 ATP + 6 NADH + 2 FADH2\n3. Oxidative Phosphorylation / ETC (Inner Mitochondrial Membrane): ~26-28 ATP.\nTotal net yield: ~30-32 ATP per glucose.",
        "category": "Cellular Respiration",
        "difficulty": "Medium",
        "examTip": "Examiners will ask where each reaction occurs! Remember: Glycolysis = cytoplasm, Krebs = matrix, ETC = inner membrane cristae."
      },
      {
        "id": 2,
        "front": "What is the final electron acceptor in Aerobic Cellular Respiration?",
        "back": "Molecular Oxygen (O2). It combines with electrons and protons (H+) to form Water (H2O). Without oxygen, the electron transport chain backs up and stops ATP synthesis.",
        "category": "Cellular Respiration",
        "difficulty": "Easy",
        "examTip": "Common 1-mark question. Do not confuse with NAD+."
      },
      {
        "id": 3,
        "front": "List the key enzymes of DNA Replication and their functions.",
        "back": "1. Helicase: Unwinds the double helix at the replication fork.\n2. Topoisomerase / Gyrase: Relieves torsional strain ahead of the fork.\n3. Primase: Synthesizes RNA primers for DNA Polymerase.\n4. DNA Polymerase III: Synthesizes new DNA strand in 5' to 3' direction.\n5. DNA Polymerase I: Replaces RNA primers with DNA.\n6. DNA Ligase: Joins Okazaki fragments on the lagging strand.",
        "category": "Genetics & DNA",
        "difficulty": "Hard",
        "examTip": "Almost guaranteed 5-mark question! Always specify 5' to 3' synthesis direction."
      },
      {
        "id": 4,
        "front": "What is the difference between Mitosis and Meiosis?",
        "back": "Mitosis: 1 division, produces 2 genetically identical diploid (2n) somatic cells. Used for growth, repair, and asexual reproduction.\nMeiosis: 2 divisions, produces 4 genetically diverse haploid (1n) gametes. Includes crossing over (Prophase I) for genetic variation.",
        "category": "Cell Division",
        "difficulty": "Medium",
        "examTip": "Table format is best for marks: # of divisions, ploidy, crossing over, purpose."
      }
    ],
    "audioScript": {
      "title": "Bio Exam Sprint: Cellular Respiration & Genetics in 6 Minutes",
      "host": "Alex",
      "cohost": "Dr. Sarah",
      "segments": [
        {
          "speaker": "Alex",
          "text": "Hey everyone! Tonight we are tackling the two biggest point-scorers on tomorrow's Biology exam: Cellular respiration and DNA replication.",
          "topic": "Overview"
        },
        {
          "speaker": "Dr. Sarah",
          "text": "Let's start right with Cellular Respiration. Remember the locations: Glycolysis happens in the cytoplasm. Krebs cycle is in the mitochondrial matrix. And the Electron Transport Chain is on the inner mitochondrial membrane.",
          "topic": "Locations of Respiration"
        },
        {
          "speaker": "Alex",
          "text": "And the ATP yield? That's always on the test.",
          "topic": "ATP Yield"
        },
        {
          "speaker": "Dr. Sarah",
          "text": "Net 2 from glycolysis, 2 from Krebs, and roughly 28 from the electron transport chain. Total is about 30 to 32 ATP. Oxygen is the final electron acceptor, forming water.",
          "topic": "Energy Output"
        },
        {
          "speaker": "Alex",
          "text": "Now, DNA replication enzymes. Students mix up Primase and Ligase every single semester.",
          "topic": "DNA Replication Enzymes"
        },
        {
          "speaker": "Dr. Sarah",
          "text": "Think of Helicase as the zipper opener, Primase lays down the initial RNA starting flag, DNA Polymerase builds the strand 5 prime to 3 prime, and Ligase is the glue that seals Okazaki fragments on the lagging strand.",
          "topic": "Replication Fork"
        },
        {
          "speaker": "Alex",
          "text": "Perfect breakdown. Review the Okazaki fragment diagram before you sleep, and you're good to ace it tomorrow morning!",
          "topic": "Conclusion"
        }
      ]
    },
    "importantQuestions": [
      {
        "id": "q1",
        "type": "long",
        "marks": 10,
        "importance": "⭐️ Guaranteed (98% Exam Probability)",
        "question": "Describe the process of DNA Replication at the replication fork. Explain the roles of Helicase, Primase, DNA Polymerase, and Ligase on leading vs lagging strands.",
        "modelAnswer": "Replication occurs bidirectionally at replication forks:\n1. Helicase unzips hydrogen bonds; single-strand binding proteins prevent reannealing.\n2. Leading Strand: Synthesized continuously 5' -> 3' toward the fork by DNA Polymerase III following a single RNA primer.\n3. Lagging Strand: Synthesized discontinuously away from the fork into Okazaki fragments. Primase synthesizes RNA primers at intervals, DNA Pol III extends them, DNA Pol I replaces primers with DNA, and DNA Ligase joins the phosphodiester backbone.",
        "keyKeywords": ["Leading strand", "Lagging strand", "Okazaki fragments", "5' to 3'", "DNA Ligase"],
        "pitfalls": "Forgetting to explain why lagging strand is discontinuous (antiparallel nature and DNA Pol only works 5' to 3')."
      }
    ],
    "quiz": [
      {
        "id": "mcq1",
        "question": "Where does the Krebs (Citric Acid) Cycle take place in eukaryotic cells?",
        "options": [
          "Cytoplasm",
          "Mitochondrial Matrix",
          "Inner Mitochondrial Membrane",
          "Intermembrane Space"
        ],
        "correct": 1,
        "explanation": "Krebs cycle occurs within the mitochondrial matrix, while oxidative phosphorylation occurs on the inner membrane cristae."
      },
      {
        "id": "mcq2",
        "question": "Which enzyme seals nicks in the sugar-phosphate backbone between Okazaki fragments?",
        "options": [
          "DNA Helicase",
          "DNA Ligase",
          "RNA Primase",
          "Topoisomerase"
        ],
        "correct": 1,
        "explanation": "DNA Ligase catalyzes the formation of phosphodiester bonds to join Okazaki fragments."
      }
    ],
    "cheatSheet": {
      "title": "5-Minute Night-Before Cheat Sheet: Biology",
      "bulletPoints": [
        "Glycolysis: Cytosol, Anaerobic, Net 2 ATP, 2 Pyruvate, 2 NADH.",
        "Krebs Cycle: Mitochondrial Matrix, 2 ATP, 6 NADH, 2 FADH2 per glucose.",
        "Final Electron Acceptor: O2 -> forms H2O via Cytochrome c Oxidase.",
        "Helicase unzips; Primase primes; Pol III builds 5'->3'; Ligase seals Okazaki fragments.",
        "Mitosis = 2 identical diploid (2n) cells; Meiosis = 4 diverse haploid (1n) cells with crossing over in Prophase I."
      ]
    }
  }
};
