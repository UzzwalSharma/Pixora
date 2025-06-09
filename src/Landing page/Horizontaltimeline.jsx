import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Pixora Steps Data
const steps = [
  {
    title: 'Upload Your Idea or UI',
    description: 'Start with an image, sketch, or Figma file — Pixora supports your creative flow.',
    side: 'left',
    image: '/uploadnew.png',
  },
  {
    title: 'AI Transforms It Instantly',
    description: "Pixora's advanced AI converts your input into clean, editable code — fast and beautifully.",
    side: 'right',
    image: '/Gemini_Generated_Image_kvln7ukvln7ukvln.png',
  },
  {
    title: 'Live Preview & Customize',
    description: 'See your project come alive in real time. Tweak it visually or in code instantly.',
    side: 'left',
    image: '/Gemini_Generated_Image_6e6mqs6e6mqs6e6m.jpeg',
  },
  {
    title: 'Collaborate & Share',
    description: 'Invite teammates to co-create, chat, or brainstorm designs inside your vibe room.',
    side: 'right',
    image: '/cherrydeck-UpsEF48wAgk-unsplash.jpg',
  },
  {
    title: 'Push to GitHub or Deploy',
    description: 'One-click export to GitHub or deploy it instantly with Pixora’s built-in deploy engine.',
    side: 'left',
    image: '/lala-azizli-8IJ5xNTv1QM-unsplash.jpg',
  },
]


// Simple Card component
const Card = ({ className = '', children }) => (
	<div className={`rounded-2xl border border-green-500 bg-gradient-to-br from-black/80 to-green-900/40 shadow-xl ${className}`}>
		{children}
	</div>
)

// Simple Button component
const Button = ({ className = '', children, ...props }) => (
	<button
		className={`inline-flex items-center px-4 py-2 rounded-lg border border-green-600 text-green-600 bg-black/30 hover:bg-green-600 hover:text-white transition font-medium shadow-sm ${className}`}
		{...props}
	>
		{children}
	</button>
)

const TimelineStep = ({ step, index, isActive, onClick }) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const controls = useAnimation()

	useEffect(() => {
		if (isInView) {
			controls.start('visible')
		}
	}, [isInView, controls])

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className={`relative flex flex-col items-center group`}
			onClick={onClick}
			tabIndex={0}
			role="button"
			aria-label={`Step: ${step.title}`}
		>
			{/* Step Number Badge */}
			<div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
				<span
					className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-400 bg-black text-green-400 font-bold text-lg shadow-md transition-all duration-300 ${
						isActive ? 'bg-green-500 text-white border-green-500 scale-110' : ''
					}`}
				>
					{index + 1} 
				</span>
			</div>
			{/* Milestone Marker */}
			<div
				className={`
          relative z-10 w-4 h-4 rounded-full border-2
          ${isActive ? 'bg-green-500 border-green-400 scale-125 shadow-lg' : 'bg-white/20 border-green-400 scale-100'}
          transition-all duration-300
        `}
			/>

			{/* Content Card */}
			<motion.div
				className={`
          mt-8 w-80 max-w-sm transition-all duration-300
          ${isActive ? 'scale-105' : 'scale-100'}
        `}
				whileHover={{ y: -4 }}
			>
				<Card
					className={`
    min-w-[320px] p-6 transition-all duration-300
    group-hover:shadow-2xl group-hover:shadow-green-400/40
    group-hover:border-green-400/50
    ${isActive ? 'border-green-400/70 shadow-2xl shadow-green-400/40' : ''}
  `}
				>
					<div className="space-y-4">
						{/* Title */}
						<h3 className="font-semibold text-white group-hover:text-green-400 transition-colors text-xl">
							{step.title}
						</h3>
						{/* Description */}
						<p className="text-base text-white/80 leading-relaxed">
							{step.description}
						</p>
						{/* Image */}
						{step.image && (
							<motion.div
								className="mt-3 rounded-lg overflow-hidden flex justify-center"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<img
									src={step.image}
									alt={step.title}
									className="w-full h-36 object-cover rounded-lg shadow"
								/>
							</motion.div>
						)}
					</div>
				</Card>
			</motion.div>
		</motion.div>
	)
}

function HorizontalTimeline() {
	const [activeIndex, setActiveIndex] = useState(0)
	const scrollContainerRef = useRef(null)
	const timelineRef = useRef(null)

	useEffect(() => {
		if (scrollContainerRef.current && timelineRef.current) {
			const container = scrollContainerRef.current
			const timeline = timelineRef.current
			const activeItem = timeline.children[activeIndex]
			if (activeItem) {
				const containerWidth = container.offsetWidth
				const itemLeft = activeItem.offsetLeft
				const itemWidth = activeItem.offsetWidth
				const scrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2
				container.scrollTo({
					left: scrollLeft,
					behavior: 'smooth',
				})
			}
		}
	}, [activeIndex])

	const handlePrevious = () => {
		setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length)
	}

	const handleNext = () => {
		setActiveIndex((prev) => (prev + 1) % steps.length)
	}

	return (
		<div className="w-full py-8">
			{/* Navigation */}
			<div className="flex items-center justify-between mb-8 px-4">
				<Button
					onClick={handlePrevious}
					className="flex items-center gap-2"
					aria-label="Previous step"
				>
					<ChevronLeft className="w-4 h-4" />
					Previous
				</Button>
				<div className="flex items-center gap-3">
					{steps.map((_, index) => (
						<button
							key={index}
							onClick={() => setActiveIndex(index)}
							className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
									index === activeIndex
										? 'bg-green-500 scale-125 shadow-lg'
										: 'bg-white/30 hover:bg-green-400/70'
								}
              `}
							aria-label={`Go to step ${index + 1}`}
						/>
					))}
				</div>
				<Button
					onClick={handleNext}
					className="flex items-center gap-2"
					aria-label="Next step"
				>
					Next
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			{/* Timeline Container */}
			<div className="relative">
				<div
					ref={scrollContainerRef}
					className="overflow-x-auto scrollbar-hide"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					<div
						ref={timelineRef}
						className="flex items-start gap-12 px-4 min-w-max relative pt-16"
						style={{ minWidth: "100vw" }}
						role="list"
						aria-label="Timeline steps"
					>
						{/* Connecting Line */}
						<div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-green-900 via-green-500 to-green-900 z-0 opacity-60" />
						<motion.div
							className="absolute top-2 left-0 h-1 bg-green-400 z-10 rounded-full"
							initial={{ width: '0%' }}
							animate={{
								width: `${((activeIndex + 1) / steps.length) * 100}%`,
							}}
							transition={{ duration: 0.8, ease: 'easeInOut' }}
						/>
						{/* Timeline Steps */}
						{steps.map((step, index) => (
							<div key={step.title} role="listitem">
								<TimelineStep
									step={step}
									index={index}
									isActive={index === activeIndex}
									onClick={() => setActiveIndex(index)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Progress Indicator */}
			<div className="mt-8 px-4">
				<div className="flex items-center justify-between text-sm text-white/60 mb-2">
					<span>Progress</span>
					<span>
						{activeIndex + 1} of {steps.length}
					</span>
				</div>
				<div className="w-full bg-white/10 rounded-full h-1">
					<motion.div
						className="bg-green-500 h-1 rounded-full"
						initial={{ width: '0%' }}
						animate={{
							width: `${((activeIndex + 1) / steps.length) * 100}%`,
						}}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default HorizontalTimeline
