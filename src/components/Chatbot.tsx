"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      // TODO: Replace with actual API call to ChatGPT
      const response = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve("This is a simulated response from the AI. In a real implementation, this would be the response from ChatGPT.")
        }, 1000)
      })

      const aiMessage: Message = { role: 'assistant', content: response }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error fetching AI response:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col shadow-lg">
              <CardHeader className="flex flex-row items-center bg-primary text-primary-foreground">
                <Bot className="h-6 w-6 mr-2" />
                <CardTitle>AI Assistant</CardTitle>
                <Button
                  variant="ghost"
                  className="ml-auto h-8 w-8 p-0 text-primary-foreground hover:text-primary-foreground/80"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 ${
                        message.role === 'assistant' ? 'text-left' : 'text-right'
                      }`}
                    >
                      <span
                        className={`inline-block rounded-lg px-3 py-2 ${
                          message.role === 'assistant'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </span>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left mb-4"
                    >
                      <span className="inline-block rounded-lg px-3 py-2 bg-primary text-primary-foreground">
                        Typing...
                      </span>
                    </motion.div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}