import { Note } from '../models/Note.js';
import { logger } from '../utils/logger.js';

export class NoteService {
  async getAllNotes(filters = {}) {
    try {
      const { archived = false } = filters;
      const filter = { archived: archived === 'true' };
      
      return await Note.find(filter)
        .sort({ pinned: -1, createdAt: -1 })
        .lean();
    } catch (error) {
      logger.error('Error fetching notes:', error);
      throw error;
    }
  }

  async getNoteById(id) {
    try {
      const note = await Note.findById(id).lean();
      if (!note) {
        throw new Error('Note not found');
      }
      return note;
    } catch (error) {
      logger.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  }

  async createNote(noteData) {
    try {
      const note = new Note(noteData);
      return await note.save();
    } catch (error) {
      logger.error('Error creating note:', error);
      throw error;
    }
  }

  async updateNote(id, updateData) {
    try {
      const note = await Note.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { 
          new: true, 
          runValidators: true,
          lean: true
        }
      );

      if (!note) {
        throw new Error('Note not found');
      }

      return note;
    } catch (error) {
      logger.error(`Error updating note ${id}:`, error);
      throw error;
    }
  }

  async archiveNote(id, archived) {
    try {
      return await this.updateNote(id, { archived });
    } catch (error) {
      logger.error(`Error archiving note ${id}:`, error);
      throw error;
    }
  }

  async pinNote(id, pinned) {
    try {
      return await this.updateNote(id, { pinned });
    } catch (error) {
      logger.error(`Error pinning note ${id}:`, error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      const result = await Note.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Note not found');
      }
      return { message: 'Note deleted successfully' };
    } catch (error) {
      logger.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  }

  async exportNotes() {
    try {
      return await Note.find().lean();
    } catch (error) {
      logger.error('Error exporting notes:', error);
      throw error;
    }
  }
}

export const noteService = new NoteService();
