 // Notes storage
        let notes = JSON.parse(localStorage.getItem('digitalNotes')) || [];
        let editingNoteId = null;

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            renderNotes();
        });

        // Show note form
        function showNoteForm() {
            document.getElementById('noteForm').classList.add('active');
            document.getElementById('noteTitle').focus();
        }

        // Hide note form
        function hideNoteForm() {
            document.getElementById('noteForm').classList.remove('active');
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        }

        // Save note
        function saveNote() {
            const title = document.getElementById('noteTitle').value.trim();
            const content = document.getElementById('noteContent').value.trim();

            if (!title && !content) {
                alert('Please enter a title or content for your note.');
                return;
            }

            const note = {
                id: Date.now().toString(),
                title: title || 'Untitled',
                content: content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            notes.unshift(note);
            saveToLocalStorage();
            renderNotes();
            hideNoteForm();
        }

        // Delete note
        function deleteNote(id) {
            if (confirm('Are you sure you want to delete this note?')) {
                notes = notes.filter(note => note.id !== id);
                saveToLocalStorage();
                renderNotes();
            }
        }

        // Start editing note
        function editNote(id) {
            const note = notes.find(n => n.id === id);
            if (!note) return;

            editingNoteId = id;
            const noteCard = document.querySelector(`[data-note-id="${id}"]`);
            noteCard.classList.add('editing');

            const editForm = noteCard.querySelector('.edit-form');
            const noteDisplay = noteCard.querySelector('.note-display');
            const editTitle = noteCard.querySelector('.edit-title');
            const editContent = noteCard.querySelector('.edit-content');

            editTitle.value = note.title;
            editContent.value = note.content;

            noteDisplay.style.display = 'none';
            editForm.classList.add('active');
            editTitle.focus();
        }

        // Save edited note
        function saveEdit(id) {
            const noteCard = document.querySelector(`[data-note-id="${id}"]`);
            const editTitle = noteCard.querySelector('.edit-title');
            const editContent = noteCard.querySelector('.edit-content');

            const title = editTitle.value.trim();
            const content = editContent.value.trim();

            if (!title && !content) {
                alert('Please enter a title or content for your note.');
                return;
            }

            const noteIndex = notes.findIndex(n => n.id === id);
            if (noteIndex !== -1) {
                notes[noteIndex].title = title || 'Untitled';
                notes[noteIndex].content = content;
                notes[noteIndex].updatedAt = new Date().toISOString();
                saveToLocalStorage();
                renderNotes();
            }
        }

        // Cancel edit
        function cancelEdit(id) {
            editingNoteId = null;
            renderNotes();
        }

        // Search notes
        function searchNotes(searchTerm) {
            const filteredNotes = notes.filter(note => 
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderNotes(filteredNotes);
        }

        // Format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Save to localStorage
        function saveToLocalStorage() {
            localStorage.setItem('digitalNotes', JSON.stringify(notes));
        }

        // Render notes
        function renderNotes(notesToRender = notes) {
            const notesGrid = document.getElementById('notesGrid');
            const emptyState = document.getElementById('emptyState');

            if (notesToRender.length === 0) {
                notesGrid.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';
            
            notesGrid.innerHTML = notesToRender.map(note => `
                <div class="note-card ${editingNoteId === note.id ? 'editing' : ''}" data-note-id="${note.id}">
                    <div class="note-display" style="${editingNoteId === note.id ? 'display: none;' : ''}">
                        <div class="note-header">
                            <h3 class="note-title">${escapeHtml(note.title)}</h3>
                            <div class="note-actions">
                                <button class="note-btn edit-btn" onclick="editNote('${note.id}')" title="Edit note">
                                    ✏️
                                </button>
                                <button class="note-btn delete-btn" onclick="deleteNote('${note.id}')" title="Delete note">
                                    🗑️
                                </button>
                            </div>
                        </div>
                        <div class="note-content">${escapeHtml(note.content)}</div>
                        <div class="note-date">${formatDate(note.updatedAt)}</div>
                    </div>
                    <div class="edit-form ${editingNoteId === note.id ? 'active' : ''}">
                        <input type="text" class="edit-input edit-title" value="${escapeHtml(note.title)}">
                        <textarea class="edit-textarea edit-content">${escapeHtml(note.content)}</textarea>
                        <div class="edit-actions">
                            <button class="btn-save" onclick="saveEdit('${note.id}')">💾 Save</button>
                            <button class="btn-cancel" onclick="cancelEdit('${note.id}')">Cancel</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Escape HTML to prevent XSS
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Handle Enter key in form
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                if (document.getElementById('noteForm').classList.contains('active')) {
                    saveNote();
                }
            }
            if (e.key === 'Escape') {
                if (document.getElementById('noteForm').classList.contains('active')) {
                    hideNoteForm();
                }
                if (editingNoteId) {
                    cancelEdit(editingNoteId);
                }
            }
        });