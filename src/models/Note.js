import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  category: { 
    type: String, 
    default: 'Others',
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  priority: { 
    type: String, 
    default: 'medium', 
    enum: {
      values: ['high', 'medium', 'low'],
      message: 'Priority must be high, medium, or low'
    }
  },
  mood: { 
    type: String, 
    default: '😊',
    maxlength: [10, 'Mood cannot exceed 10 characters']
  },
  tags: { 
    type: [String], 
    default: [],
    validate: {
      validator: (tags) => tags.length <= 10,
      message: 'Cannot have more than 10 tags'
    }
  },
  color: { 
    type: String, 
    default: '#667eea',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  },
  archived: { 
    type: Boolean, 
    default: false,
    index: true
  },
  pinned: { 
    type: Boolean, 
    default: false,
    index: true
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
noteSchema.index({ createdAt: -1 });
noteSchema.index({ pinned: -1, createdAt: -1 });

export const Note = mongoose.model('Note', noteSchema);
