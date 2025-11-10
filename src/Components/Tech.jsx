"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Badge,
  Rating,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  Search,
  ExpandMore,
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  FilterList,
  Code,
  LightbulbOutlined,
  QuestionAnswer,
  School,
  Check,
  ContentCopy,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

// Theme object with updated card background colors
const theme = {
  primary: "#2b6777",
  primaryLight: "#52ab98",
  primaryDark: "#1a3c48",
  secondary: "#c8d8e4",
  secondaryLight: "#f0f5f9",
  accent: "#f2a154",
  accentDark: "#e67e22",
  tertiary: "#7e57c2",
  tertiaryLight: "#b085f5",
  background: "#c5e8e0",
  white: "#ffffff",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  text: "#2b6777",
  textLight: "#52ab98",
  textDark: "#1a3c48",
  cardBackground: "#e0e7ee", // Darker gray shade for cards
  cardBackgroundDark: "#d0d8e0", // Even darker shade for some cards
  cardBackgroundLight: "#e8eef4", // Lighter shade for hover states
  codeBackground: "#2d3748", // Dark background for code blocks
}

// Global styles with gradient background
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, ${(props) => props.theme.background} 0%, #d8f3eb 100%);
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`

// Styled Components with enhanced styling
const PageContainer = styled(motion.div)`
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
`

const PageHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.2);
  color: ${(props) => props.theme.white};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
  }
`

const SectionTitle = styled(Typography)`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.white};
  margin: 0;
`

const SectionContainer = styled(motion(Paper))`
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  border: 1px solid rgba(43, 103, 119, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const SectionHeader = styled.div`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SectionContent = styled.div`
  padding: 2rem;
`

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: ${(props) => props.theme.cardBackground};
    border-radius: 8px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.primary};
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.primary};
    }
  }
`

const FilterButton = styled(Button)`
  background-color: ${(props) => (props.active ? props.theme.primary : props.theme.cardBackground)};
  color: ${(props) => (props.active ? props.theme.white : props.theme.primary)};
  border: 1px solid ${(props) => (props.active ? props.theme.primary : "rgba(43, 103, 119, 0.2)")};
  text-transform: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    background-color: ${(props) => (props.active ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
  }
`

const StyledTabs = styled(Tabs)`
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  border-radius: 8px;
  padding: 0.5rem;
  
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.primary};
    height: 3px;
    border-radius: 3px;
  }
  
  .MuiTab-root {
    text-transform: none;
    font-weight: 500;
    color: ${(props) => props.theme.textLight};
    min-height: 48px;
    
    &.Mui-selected {
      color: ${(props) => props.theme.primary};
      font-weight: 600;
    }
  }
`

const BackButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const StyledAccordion = styled(Accordion)`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px !important;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  border: 1px solid rgba(43, 103, 119, 0.1);
  
  &:before {
    display: none;
  }
  
  &.Mui-expanded {
    margin-top: 0;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme.cardBackgroundLight};
    border: 1px solid rgba(43, 103, 119, 0.2);
  }
  
  .MuiAccordionSummary-root {
    padding: 0 1.5rem;
    min-height: 64px;
    
    &.Mui-expanded {
      min-height: 64px;
      background-color: ${(props) => props.theme.cardBackgroundDark};
    }
  }
  
  .MuiAccordionSummary-content {
    margin: 1rem 0;
    
    &.Mui-expanded {
      margin: 1rem 0;
    }
  }
  
  .MuiAccordionDetails-root {
    padding: 1.5rem;
    background-color: ${(props) => props.theme.cardBackground};
  }
`

const QuestionTitle = styled(Typography)`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  flex-grow: 1;
`

const QuestionMeta = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`

const DifficultyChip = styled(Chip)`
  background-color: ${(props) =>
    props.level === "easy"
      ? "rgba(76, 175, 80, 0.1)"
      : props.level === "medium"
        ? "rgba(255, 152, 0, 0.1)"
        : "rgba(244, 67, 54, 0.1)"};
  color: ${(props) =>
    props.level === "easy" ? props.theme.success : props.level === "medium" ? props.theme.warning : props.theme.error};
  font-weight: 500;
  border: 1px solid ${(props) =>
    props.level === "easy"
      ? "rgba(76, 175, 80, 0.2)"
      : props.level === "medium"
        ? "rgba(255, 152, 0, 0.2)"
        : "rgba(244, 67, 54, 0.2)"};
`

const CategoryChip = styled(Chip)`
  background-color: rgba(43, 103, 119, 0.1);
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  border: 1px solid rgba(43, 103, 119, 0.2);
  margin-right: 0.5rem;
`

const CodeBlock = styled(Box)`
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const CodeHeader = styled(Box)`
  background-color: ${(props) => props.theme.primaryDark};
  color: ${(props) => props.theme.white};
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CodeLanguage = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
`

const CopyButton = styled(IconButton)`
  color: ${(props) => props.theme.white};
  padding: 0.25rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const AnswerSection = styled(Box)`
  background-color: ${(props) => props.theme.cardBackgroundLight};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
`

const TipBox = styled(Box)`
  background-color: rgba(242, 161, 84, 0.1);
  border-left: 4px solid ${(props) => props.theme.accent};
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.primary ? "white" : props.theme.primary)};
  background: ${(props) => (props.primary ? props.theme.primary : "transparent")};
  border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primary}`)};
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(43, 103, 119, 0.2)" : "none")};
  
  &:hover {
    background: ${(props) => (props.primary ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(43, 103, 119, 0.3)" : "0 4px 10px rgba(43, 103, 119, 0.1)")};
  }
`

const ProgressCard = styled(Card)`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const ProgressCardHeader = styled(Box)`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const ProgressCardTitle = styled(Typography)`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackgroundDark};
  border-radius: 8px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const StatValue = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
`

const StatLabel = styled(Typography)`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textLight};
  text-align: center;
`

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

// Mock data for interview questions
const categories = [
  "All Questions",
  "React",
  "JavaScript",
  "CSS",
  "HTML",
  "Data Structures",
  "Algorithms",
  "System Design",
]

const interviewQuestions = [
  {
    id: 1,
    question: "What is the difference between state and props in React?",
    answer: `
      <p>State and props are both used to manage data in React components, but they serve different purposes:</p>
      
      <h4>Props (Properties):</h4>
      <ul>
        <li>Props are passed from parent to child components</li>
        <li>Props are immutable (read-only)</li>
        <li>Used to pass data and event handlers down the component tree</li>
        <li>Changes in props trigger re-renders</li>
      </ul>
      
      <h4>State:</h4>
      <ul>
        <li>State is managed within the component</li>
        <li>State is mutable and can be updated using setState() or useState() hook</li>
        <li>Changes in state trigger re-renders</li>
        <li>State should be used for data that changes over time</li>
      </ul>
      
      <p>Example of props vs state:</p>
    `,
    code: `
// Parent component passing props
function ParentComponent() {
  // This is state
  const [count, setCount] = useState(0);
  
  return (
    <ChildComponent 
      // This is props when passed to the child
      count={count} 
      onIncrement={() => setCount(count + 1)}
    />
  );
}

// Child component receiving props
function ChildComponent({ count, onIncrement }) {
  // count is a prop here, not state
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}
    `,
    category: "React",
    difficulty: "easy",
    bookmarked: false,
    tip: "Remember that props flow down, events flow up. This is often called 'one-way data flow'.",
  },
  {
    id: 2,
    question: "Explain closures in JavaScript with an example.",
    answer: `
      <p>A closure is a function that has access to its own scope, the scope of the outer function, and the global scope. It has access to variables from its containing function even after that function has finished executing.</p>
      
      <p>Closures are created every time a function is created, at function creation time. They are useful for:</p>
      <ul>
        <li>Data privacy / creating private variables</li>
        <li>Function factories</li>
        <li>Maintaining state in async operations</li>
      </ul>
      
      <p>Here's an example of a closure:</p>
    `,
    code: `
function createCounter() {
  // This variable is enclosed in the returned function
  let count = 0;
  
  return function() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// The count variable is not accessible directly
console.log(count); // ReferenceError: count is not defined
    `,
    category: "JavaScript",
    difficulty: "medium",
    bookmarked: true,
    tip: "Closures are often used to create private variables in JavaScript, as the language doesn't have a built-in way to declare private variables.",
  },
  {
    id: 3,
    question: "What is the CSS Box Model?",
    answer: `
      <p>The CSS Box Model is a fundamental concept that describes how elements are rendered on a web page. It consists of:</p>
      
      <ul>
        <li><strong>Content:</strong> The actual content of the element (text, images, etc.)</li>
        <li><strong>Padding:</strong> The space between the content and the border</li>
        <li><strong>Border:</strong> The line that surrounds the padding</li>
        <li><strong>Margin:</strong> The space outside the border, between this element and other elements</li>
      </ul>
      
      <p>By default, when you set the width and height of an element, you're setting the width and height of the content area only. However, the actual space the element takes up includes padding, border, and margin.</p>
      
      <p>You can change this behavior using the <code>box-sizing</code> property:</p>
    `,
    code: `
/* Default box model (content-box) */
.content-box {
  width: 300px;
  padding: 20px;
  border: 10px solid #333;
  margin: 20px;
  /* Total width: 300px + 40px (padding) + 20px (border) + 40px (margin) = 400px */
}

/* Border-box model */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 10px solid #333;
  margin: 20px;
  /* Total width: 300px + 40px (margin) = 340px */
  /* The padding and border are included in the 300px width */
}
    `,
    category: "CSS",
    difficulty: "easy",
    bookmarked: false,
    tip: "Using box-sizing: border-box is often preferred as it makes sizing elements more intuitive - the width you set is the actual width the element takes up (excluding margin).",
  },
  {
    id: 4,
    question: "Implement a function to reverse a linked list.",
    answer: `
      <p>Reversing a linked list is a common interview question that tests your understanding of linked list operations and pointer manipulation.</p>
      
      <p>The approach is to iterate through the list, changing the direction of the pointers:</p>
      
      <ol>
        <li>Initialize three pointers: prev (null), current (head), and next (null)</li>
        <li>Iterate through the list until current becomes null</li>
        <li>For each node, save the next node, reverse the pointer, and move the pointers forward</li>
        <li>Return prev as the new head of the reversed list</li>
      </ol>
      
      <p>Here's the implementation:</p>
    `,
    code: `
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    // Save the next node
    let next = current.next;
    
    // Reverse the pointer
    current.next = prev;
    
    // Move pointers forward
    prev = current;
    current = next;
  }
  
  // prev is the new head of the reversed list
  return prev;
}

// Example usage:
// 1 -> 2 -> 3 -> 4 -> 5 -> null
// becomes
// 5 -> 4 -> 3 -> 2 -> 1 -> null

const list = new ListNode(1, 
  new ListNode(2, 
    new ListNode(3, 
      new ListNode(4, 
        new ListNode(5)))));

const reversedList = reverseLinkedList(list);
    `,
    category: "Data Structures",
    difficulty: "medium",
    bookmarked: true,
    tip: "This algorithm has O(n) time complexity and O(1) space complexity, which is optimal for this problem.",
  },
  {
    id: 5,
    question: "Explain the Virtual DOM in React and how it improves performance.",
    answer: `
      <p>The Virtual DOM (VDOM) is a programming concept where a virtual representation of the UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.</p>
      
      <h4>How it works:</h4>
      <ol>
        <li>When a component's state changes, React creates a new Virtual DOM tree</li>
        <li>React compares this new tree with the previous Virtual DOM tree (diffing)</li>
        <li>React calculates the most efficient way to update the real DOM</li>
        <li>React updates only the necessary parts of the real DOM</li>
      </ol>
      
      <h4>Performance benefits:</h4>
      <ul>
        <li>Minimizes DOM manipulation, which is slow</li>
        <li>Batches DOM updates for better performance</li>
        <li>Reduces browser reflows and repaints</li>
        <li>Allows for cross-platform development (React Native uses the same concept)</li>
      </ul>
      
      <p>The Virtual DOM is not always faster than direct DOM manipulation for simple applications, but it provides a consistent programming model that makes building complex UIs easier while maintaining good performance.</p>
    `,
    code: `
// When state changes in React
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Behind the scenes:
// 1. React creates a new Virtual DOM tree with updated count
// 2. React compares it with the previous Virtual DOM tree
// 3. React identifies that only the text content of the <p> needs to change
// 4. React updates only that specific part of the real DOM
    `,
    category: "React",
    difficulty: "medium",
    bookmarked: false,
    tip: "While the Virtual DOM is efficient, you should still be mindful of unnecessary re-renders. Use React.memo, useMemo, and useCallback when appropriate to optimize performance further.",
  },
  {
    id: 6,
    question: "What is the time complexity of common array operations in JavaScript?",
    answer: `
      <p>Understanding the time complexity of array operations is crucial for writing efficient code. Here are the common array operations in JavaScript and their time complexities:</p>
      
      <h4>Constant Time O(1):</h4>
      <ul>
        <li>Access by index: <code>arr[i]</code></li>
        <li>Push/pop (adding/removing at the end): <code>arr.push()</code>, <code>arr.pop()</code></li>
        <li>Length property: <code>arr.length</code></li>
      </ul>
      
      <h4>Linear Time O(n):</h4>
      <ul>
        <li>Shift/unshift (adding/removing at the beginning): <code>arr.shift()</code>, <code>arr.unshift()</code></li>
        <li>Searching: <code>arr.indexOf()</code>, <code>arr.find()</code>, <code>arr.includes()</code></li>
        <li>Iteration: <code>arr.forEach()</code>, <code>arr.map()</code>, <code>arr.filter()</code>, <code>arr.reduce()</code></li>
        <li>Splice (adding/removing at a specific index): <code>arr.splice()</code></li>
        <li>Slice (creating a new array from a portion): <code>arr.slice()</code></li>
        <li>Concat (combining arrays): <code>arr.concat()</code></li>
      </ul>
      
      <h4>O(n log n):</h4>
      <ul>
        <li>Sorting: <code>arr.sort()</code> (implementation-dependent, but typically O(n log n))</li>
      </ul>
      
      <p>Note that operations like <code>shift</code>, <code>unshift</code>, and <code>splice</code> are O(n) because they require reindexing all elements after the insertion/deletion point.</p>
    `,
    code: `
// O(1) - Constant time
const lastItem = arr[arr.length - 1];
arr.push(newItem);
const poppedItem = arr.pop();

// O(n) - Linear time
arr.unshift(newItem); // Avoid in large arrays if performance is critical
arr.shift(); // Avoid in large arrays if performance is critical
const foundItem = arr.find(item => item.id === 42);
const newArray = arr.filter(item => item.value > 10);

// O(n log n) - Higher time complexity
arr.sort((a, b) => a - b);

// Performance tip: If you need to add items to the beginning often,
// consider using a different data structure or reversing your approach
    `,
    category: "JavaScript",
    difficulty: "medium",
    bookmarked: true,
    tip: "If you need to frequently add or remove items from the beginning of an array, consider using a different data structure like a linked list or a queue implementation.",
  },
  {
    id: 7,
    question: "Explain the CSS 'position' property and its different values.",
    answer: `
      <p>The CSS <code>position</code> property specifies how an element is positioned in a document. It has five main values:</p>
      
      <h4>1. Static (default):</h4>
      <ul>
        <li>Elements are positioned according to the normal flow of the document</li>
        <li>The <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and <code>z-index</code> properties have no effect</li>
      </ul>
      
      <h4>2. Relative:</h4>
      <ul>
        <li>Elements are positioned relative to their normal position in the document flow</li>
        <li>Other elements are not affected by a relatively positioned element</li>
        <li>The <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties specify the offset from the element's normal position</li>
      </ul>
      
      <h4>3. Absolute:</h4>
      <ul>
        <li>Elements are positioned relative to the nearest positioned ancestor (an element with position other than static)</li>
        <li>If there is no positioned ancestor, it's positioned relative to the initial containing block (usually the viewport)</li>
        <li>Absolute positioned elements are removed from the normal document flow</li>
        <li>Other elements behave as if the absolute positioned element doesn't exist</li>
      </ul>
      
      <h4>4. Fixed:</h4>
      <ul>
        <li>Elements are positioned relative to the viewport (browser window)</li>
        <li>They remain in the same position even when the page is scrolled</li>
        <li>Fixed elements are removed from the normal document flow</li>
        <li>Commonly used for navigation bars, headers, or other elements that should stay visible while scrolling</li>
      </ul>
      
      <h4>5. Sticky:</h4>
      <ul>
        <li>A hybrid of relative and fixed positioning</li>
        <li>Elements are treated as relative positioned until they cross a specified threshold, then treated as fixed</li>
        <li>Commonly used for section headings that stick to the top when scrolling through content</li>
      </ul>
    `,
    code: `
/* Static positioning (default) */
.static {
  position: static;
}

/* Relative positioning */
.relative {
  position: relative;
  top: 20px;
  left: 20px;
  /* Offset 20px down and 20px right from its normal position */
}

/* Absolute positioning */
.absolute {
  position: absolute;
  top: 20px;
  right: 20px;
  /* Positioned 20px from top and 20px from right of nearest positioned ancestor */
}

/* Fixed positioning */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Stays at the top of the viewport even when scrolling */
}

/* Sticky positioning */
.sticky-header {
  position: sticky;
  top: 0;
  /* Acts like relative until the user scrolls to the 'top: 0' threshold, then becomes fixed */
}
    `,
    category: "CSS",
    difficulty: "easy",
    bookmarked: false,
    tip: "When using absolute positioning, remember to set position: relative on the parent element if you want to position relative to that parent rather than the viewport.",
  },
  {
    id: 8,
    question: "Explain the concept of event bubbling and capturing in JavaScript.",
    answer: `
      <p>Event propagation in JavaScript has three phases:</p>
      
      <h4>1. Capturing Phase:</h4>
      <ul>
        <li>Events start from the window and travel down to the target element</li>
        <li>Rarely used, but can be accessed by setting the third parameter of addEventListener to true</li>
      </ul>
      
      <h4>2. Target Phase:</h4>
      <ul>
        <li>The event reaches the target element</li>
      </ul>
      
      <h4>3. Bubbling Phase:</h4>
      <ul>
        <li>Events "bubble up" from the target element back to the window</li>
        <li>This is the default behavior for most events</li>
        <li>Allows for event delegation (handling events at a higher level)</li>
      </ul>
      
      <p>Event bubbling means that when an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. This is the default behavior for most events.</p>
      
      <p>You can stop event propagation using <code>event.stopPropagation()</code> method.</p>
    `,
    code: `
// Event bubbling example
document.querySelector('#parent').addEventListener('click', function(event) {
  console.log('Parent clicked');
});

document.querySelector('#child').addEventListener('click', function(event) {
  console.log('Child clicked');
  // event.stopPropagation(); // Uncomment to stop bubbling
});

// When clicking on #child, the console will show:
// "Child clicked"
// "Parent clicked"

// Event capturing example
document.querySelector('#parent').addEventListener('click', function(event) {
  console.log('Parent captured');
}, true); // true enables capturing phase

document.querySelector('#child').addEventListener('click', function(event) {
  console.log('Child clicked');
});

// When clicking on #child, the console will show:
// "Parent captured" (capturing phase)
// "Child clicked" (target phase)
    `,
    category: "JavaScript",
    difficulty: "medium",
    bookmarked: false,
    tip: "Event delegation is a powerful pattern that uses event bubbling to handle events at a higher level in the DOM, which can improve performance when you have many similar elements that need the same event handler.",
  },
  {
    id: 9,
    question: "What is the time complexity of searching in a binary search tree (BST)?",
    answer: `
      <p>The time complexity of searching in a binary search tree (BST) depends on the shape of the tree:</p>
      
      <h4>Average Case: O(log n)</h4>
      <p>In a balanced BST, the height of the tree is approximately log n, where n is the number of nodes. Each comparison allows you to eliminate roughly half of the remaining tree, resulting in a logarithmic time complexity.</p>
      
      <h4>Worst Case: O(n)</h4>
      <p>In a degenerate or unbalanced BST (essentially a linked list), the height can be as much as n, resulting in linear time complexity.</p>
      
      <h4>Best Case: O(1)</h4>
      <p>If the element you're looking for is at the root of the tree.</p>
      
      <p>To ensure O(log n) search time, self-balancing BSTs like AVL trees or Red-Black trees are used, which maintain balance during insertions and deletions.</p>
    `,
    code: `
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function searchBST(root, val) {
  // Base cases: root is null or value found
  if (root === null || root.val === val) {
    return root;
  }
  
  // If value is less than root, search in left subtree
  if (val < root.val) {
    return searchBST(root.left, val);
  }
  
  // If value is greater than root, search in right subtree
  return searchBST(root.right, val);
}

// Example usage:
const root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);
root.right.right = new TreeNode(14);

//       8
//      / \\
//     3   10
//    / \\    \\
//   1   6    14

const result = searchBST(root, 6); // Returns the node with value 6
const notFound = searchBST(root, 7); // Returns null
    `,
    category: "Data Structures",
    difficulty: "medium",
    bookmarked: false,
    tip: "In interviews, always mention that while a BST has O(log n) average case search time, you need a balanced BST to guarantee this performance. Self-balancing trees like AVL or Red-Black trees are often preferred in practice.",
  },
  {
    id: 10,
    question: "Explain React hooks and give examples of commonly used hooks.",
    answer: `
      <p>React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 to allow using state and other React features without writing a class.</p>
      
      <h4>Commonly used hooks:</h4>
      
      <h5>1. useState</h5>
      <p>Lets you add state to function components.</p>
      
      <h5>2. useEffect</h5>
      <p>Lets you perform side effects in function components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>
      
      <h5>3. useContext</h5>
      <p>Lets you subscribe to React context without introducing nesting.</p>
      
      <h5>4. useReducer</h5>
      <p>An alternative to useState for complex state logic. Similar to Redux's pattern.</p>
      
      <h5>5. useCallback</h5>
      <p>Returns a memoized callback that only changes if one of the dependencies has changed.</p>
      
      <h5>6. useMemo</h5>
      <p>Returns a memoized value that only recalculates when one of the dependencies has changed.</p>
      
      <h5>7. useRef</h5>
      <p>Lets you create a mutable ref object that persists for the lifetime of the component.</p>
      
      <h5>8. useLayoutEffect</h5>
      <p>Similar to useEffect, but fires synchronously after all DOM mutations.</p>
      
      <h5>9. useImperativeHandle</h5>
      <p>Customizes the instance value exposed when using React.forwardRef.</p>
      
      <h5>10. useDebugValue</h5>
      <p>Used to display a label for custom hooks in React DevTools.</p>
    `,
    code: `
// useState example
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// useEffect example
function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setUser(null);
    
    // Fetch user data
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
      
    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      // Cancel any pending requests or subscriptions
    };
  }, [userId]); // Only re-run if userId changes
  
  if (loading) return <div>Loading...</div>;
  return <div>User: {user.name}</div>;
}

// useContext example
const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}

// useReducer example
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
    `,
    category: "React",
    difficulty: "medium",
    bookmarked: true,
    tip: "When using hooks, remember the Rules of Hooks: only call hooks at the top level (not inside loops, conditions, or nested functions) and only call hooks from React function components or custom hooks.",
  },
]

function TechnicalInterviewQuestions() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([2, 4, 6, 10]) // IDs of initially bookmarked questions
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)

  // Filter questions based on search term and selected category
  const filteredQuestions = interviewQuestions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === 0) return matchesSearch // All questions
    return matchesSearch && question.category === categories[selectedTab]
  })

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const toggleBookmark = (questionId) => {
    if (bookmarkedQuestions.includes(questionId)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter((id) => id !== questionId))
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, questionId])
    }
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedQuestion(isExpanded ? panel : null)
  }

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code.trim())
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Count questions by difficulty
  const easyQuestions = interviewQuestions.filter((q) => q.difficulty === "easy").length
  const mediumQuestions = interviewQuestions.filter((q) => q.difficulty === "medium").length
  const hardQuestions = interviewQuestions.filter((q) => q.difficulty === "hard").length

  // Count questions by category
  const questionsByCategory = categories.slice(1).map((category) => ({
    category,
    count: interviewQuestions.filter((q) => q.category === category).length,
  }))

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial="hidden" animate="visible" variants={containerVariants}>
        {/* Page Header */}
        <PageHeader variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BackButton startIcon={<ArrowBack />} onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </BackButton>
            <Box sx={{ ml: 3 }}>
              <SectionTitle variant="h4">
                <QuestionAnswer sx={{ fontSize: 32 }} /> Technical Interview Questions
              </SectionTitle>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 1 }}>
                Prepare for your next technical interview with these common questions and detailed answers
              </Typography>
            </Box>
          </Box>
        </PageHeader>

        {/* Progress Overview */}
        <SectionContainer variants={itemVariants}>
          <SectionHeader>
            <School sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Your Progress</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <ProgressCard>
                  <ProgressCardHeader>
                    <ProgressCardTitle variant="h6">
                      <QuestionAnswer fontSize="small" /> Questions by Difficulty
                    </ProgressCardTitle>
                  </ProgressCardHeader>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <StatBox>
                          <StatValue>{easyQuestions}</StatValue>
                          <StatLabel>Easy</StatLabel>
                        </StatBox>
                      </Grid>
                      <Grid item xs={4}>
                        <StatBox>
                          <StatValue>{mediumQuestions}</StatValue>
                          <StatLabel>Medium</StatLabel>
                        </StatBox>
                      </Grid>
                      <Grid item xs={4}>
                        <StatBox>
                          <StatValue>{hardQuestions}</StatValue>
                          <StatLabel>Hard</StatLabel>
                        </StatBox>
                      </Grid>
                    </Grid>
                  </CardContent>
                </ProgressCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <ProgressCard>
                  <ProgressCardHeader>
                    <ProgressCardTitle variant="h6">
                      <Bookmark fontSize="small" /> Bookmarked Questions
                    </ProgressCardTitle>
                  </ProgressCardHeader>
                  <CardContent>
                    <StatBox sx={{ height: "100%" }}>
                      <StatValue>{bookmarkedQuestions.length}</StatValue>
                      <StatLabel>Questions saved for later review</StatLabel>
                      <Box sx={{ mt: 2 }}>
                        <ActionButton
                          size="small"
                          onClick={() => setSelectedTab(0)}
                          endIcon={<ArrowBack sx={{ transform: "rotate(180deg)" }} />}
                        >
                          View Bookmarked
                        </ActionButton>
                      </Box>
                    </StatBox>
                  </CardContent>
                </ProgressCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <ProgressCard>
                  <ProgressCardHeader>
                    <ProgressCardTitle variant="h6">
                      <Check fontSize="small" /> Completion Status
                    </ProgressCardTitle>
                  </ProgressCardHeader>
                  <CardContent>
                    <StatBox sx={{ height: "100%" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <StatValue>
                          {Math.round(((expandedQuestion ? 1 : 0) / interviewQuestions.length) * 100)}%
                        </StatValue>
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          Complete
                        </Typography>
                      </Box>
                      <StatLabel>Keep going! Expand questions to mark them as viewed</StatLabel>
                    </StatBox>
                  </CardContent>
                </ProgressCard>
              </Grid>
            </Grid>
          </SectionContent>
        </SectionContainer>

        {/* Main Content */}
        <SectionContainer variants={itemVariants}>
          <SectionHeader>
            <Code sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Interview Questions</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {/* Search and Filter */}
            <SearchContainer>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1, position: "relative" }}>
                <StyledTextField
                  fullWidth
                  placeholder="Search questions by keyword..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm("")}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              bgcolor: "rgba(0,0,0,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              color: "white",
                            }}
                          >
                            ×
                          </Box>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FilterButton
                  startIcon={<Bookmark />}
                  onClick={() => setSearchTerm("bookmarked")}
                  active={searchTerm === "bookmarked"}
                >
                  Bookmarked
                </FilterButton>
                <Tooltip title="More filters">
                  <IconButton
                    sx={{
                      bgcolor: theme.cardBackgroundDark,
                      color: theme.primary,
                      "&:hover": { bgcolor: "rgba(43, 103, 119, 0.15)" },
                    }}
                  >
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </Box>
            </SearchContainer>

            {/* Category Tabs */}
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="category tabs"
            >
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {category}
                      {index > 0 && (
                        <Badge
                          badgeContent={interviewQuestions.filter((q) => q.category === category).length}
                          color="primary"
                          sx={{
                            "& .MuiBadge-badge": {
                              bgcolor: theme.primary,
                              color: "white",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              ))}
            </StyledTabs>

            {/* Questions Accordion */}
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <StyledAccordion
                  key={question.id}
                  expanded={expandedQuestion === question.id}
                  onChange={handleAccordionChange(question.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <QuestionTitle variant="subtitle1">{question.question}</QuestionTitle>
                      <QuestionMeta>
                        <DifficultyChip
                          level={question.difficulty}
                          label={question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(question.id)
                          }}
                          sx={{
                            color: bookmarkedQuestions.includes(question.id) ? theme.accent : theme.textLight,
                          }}
                        >
                          {bookmarkedQuestions.includes(question.id) ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </QuestionMeta>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <CategoryChip label={question.category} size="small" />
                      <Box sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: question.answer }} />

                      {question.code && (
                        <CodeBlock>
                          <CodeHeader>
                            <CodeLanguage>JavaScript</CodeLanguage>
                            <CopyButton size="small" onClick={() => copyToClipboard(question.code, question.id)}>
                              {copiedCode === question.id ? (
                                <Check fontSize="small" />
                              ) : (
                                <ContentCopy fontSize="small" />
                              )}
                            </CopyButton>
                          </CodeHeader>
                          <SyntaxHighlighter
                            language="javascript"
                            style={docco}
                            customStyle={{
                              margin: 0,
                              padding: "1rem",
                              borderRadius: "0 0 8px 8px",
                              backgroundColor: theme.cardBackgroundDark,
                            }}
                          >
                            {question.code.trim()}
                          </SyntaxHighlighter>
                        </CodeBlock>
                      )}

                      {question.tip && (
                        <TipBox>
                          <LightbulbOutlined sx={{ color: theme.accent, mt: 0.5 }} />
                          <Typography variant="body2">
                            <strong>Pro Tip:</strong> {question.tip}
                          </Typography>
                        </TipBox>
                      )}

                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ color: theme.textLight }}>
                            Rate this answer:
                          </Typography>
                          <Rating name={`rating-${question.id}`} defaultValue={4.5} precision={0.5} size="small" />
                        </Box>
                        <ActionButton
                          size="small"
                          primary
                          onClick={() =>
                            setExpandedQuestion(question.id === interviewQuestions.length ? 1 : question.id + 1)
                          }
                        >
                          Next Question
                        </ActionButton>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </StyledAccordion>
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  backgroundColor: theme.cardBackground,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: theme.textLight, mb: 2 }}>
                  No questions found matching your search criteria
                </Typography>
                <ActionButton
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedTab(0)
                  }}
                >
                  Clear Filters
                </ActionButton>
              </Box>
            )}
          </SectionContent>
        </SectionContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default TechnicalInterviewQuestions
