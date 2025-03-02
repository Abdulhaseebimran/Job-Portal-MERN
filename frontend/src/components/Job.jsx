import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate();
  const jobId = 1213123;

  return (
    <motion.div
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">10 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
            />
          </Avatar>
        </Button>
        <div>
          <h2 className="text-md font-semibold">New</h2>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-xl mb-2">Web Developer</h1>
        <p className="text-sm text-gray-600">
          Join our innovative team to build the next generation of web solutions.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          Web Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          Frontend
        </Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">
          100 LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${jobId}`)}
          className="rounded-md"
        >
          Details
        </Button>
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700 rounded-md"
          onClick={() => console.log('Saved')}
        >
          Save For Later
        </Button>
      </div>
    </motion.div>
  )
}

export default Job
