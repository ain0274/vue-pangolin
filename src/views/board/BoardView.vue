<template>
    <main class="board-page">
        <div v-if="viewMode === 'list'" class="boardList">
            <div class="boardList__header">
                <h2>게시판</h2>
                <div class="boardList__actions">
                    <button type="button" class="sortBtn" @click="toggleSort">
                        <ArrowUpDown :size="16" />
                        <span>{{ sortOrder === 'desc' ? '최신순' : '오래된순' }}</span>
                    </button>
                    <button type="button" class="writeBtn" @click="goToWrite">
                        <PenSquare :size="16" />
                        <span>글쓰기</span>
                    </button>
                </div>
            </div>

            <div v-if="sortedPosts.length === 0" class="boardList__empty">
                <p>등록된 게시글이 없습니다.</p>
                <button type="button" class="first-write-btn" @click="goToWrite">
                    첫 게시글 작성하기
                </button>
            </div>

            <table v-else class="boardList__table">
                <thead>
                    <tr>
                        <th class="col-no">번호</th>
                        <th class="col-title">제목</th>
                        <th class="col-author">작성자</th>
                        <th class="col-date">작성일</th>
                        <th class="col-views">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="item in sortedPosts" 
                        :key="item.id" 
                        @click="goToDetail(item.id)"
                    >
                        <td class="col-no">{{ item.id }}</td>
                        <td class="col-title title-cell">{{ item.title }}</td>
                        <td class="col-author">{{ item.author }}</td>
                        <td class="col-date">{{ item.date }}</td>
                        <td class="col-views">{{ item.views }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else-if="viewMode === 'detail' && currentPost" class="boardDetail">
            <div class="boardDetail__header">
                <h2>{{ currentPost.title }}</h2>
                <div class="meta">
                <span>{{ currentPost.author }}</span>
                <span>{{ currentPost.date }}</span>
                <span>조회 {{ currentPost.views }}</span>
                </div>
            </div>

            <div class="boardDetail__content">
                <p>{{ currentPost.content }}</p>
            </div>

            <div class="boardDetail__actions">
                <button type="button" @click="goToList">목록</button>
                <button type="button" class="btn-edit-action" @click="goToEdit(currentPost.id)">수정</button>
                <button type="button" @click="deletePost(currentPost.id)">삭제</button>
            </div>
        </div>

        <div v-else-if="viewMode === 'form'" class="boardWrite">
            <h2>{{ isEditing ? '게시글 수정' : '게시글 작성' }}</h2>

            <form @submit.prevent="savePost">
                <div class="boardWrite__input">
                <input 
                    v-model="form.title" 
                    type="text" 
                    placeholder="제목" 
                />
                <input 
                    v-model="form.author" 
                    type="text" 
                    placeholder="작성자" 
                />
                </div>

                <textarea 
                    v-model="form.content" 
                    rows="10" 
                    placeholder="내용을 입력하세요." 
                ></textarea>

                <div class="boardWrite__actions">
                <button type="button" @click="cancelForm">취소</button>
                <button type="submit">{{ isEditing ? '수정' : '등록' }}</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowUpDown, PenSquare } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const STORAGE_KEY = 'pangolin_board_posts';

const defaultPosts = [
    {
        id: 2,
        title: '시스템 점검 안내',
        author: '관리자',
        date: '2026-09-05',
        views: 8,
        content: '9월 10일 새벽 2시~4시 점검이 예정되어 있습니다.'
    },
    {
        id: 1,
        title: '게시판 공지사항입니다',
        author: '관리자',
        date: '2026-09-01',
        views: 12,
        content: '공통관리 게시판 운영 안내드립니다.'
    }
];

const loadPostsFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultPosts;
    } catch (e) {
        console.error('로컬스토리지 읽기 실패:', e);
        return defaultPosts;
    }
};

const posts = ref(loadPostsFromStorage());

watch(
    posts,
    (newPosts) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    },
    { deep: true }
);

const sortOrder = ref('desc');
const currentPost = ref(null);
const form = ref({ title: '', author: '', content: '' });

// URL 경로에 따라 화면 모드 판별
const viewMode = computed(() => {
    if (route.path === '/board/write' || route.path.endsWith('/edit')) {
        return 'form';
    }
    if (route.params.id) {
        return 'detail';
    }
    return 'list';
});

const isEditing = computed(() => route.path.endsWith('/edit'));

watch(
    () => route.path,
    () => {
        const id = Number(route.params.id);
        if (id) {
            const found = posts.value.find(p => p.id === id);
            if (found) {
                currentPost.value = found;
                if (isEditing.value) {
                form.value = { title: found.title, author: found.author, content: found.content };
                }
            } else {
                router.push('/board');
            }
        } else if (route.path === '/board/write') {
            form.value = { title: '', author: '관리자', content: '' };
        }
    },
    { immediate: true }
);

const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => {
        return sortOrder.value === 'desc' ? b.id - a.id : a.id - b.id;
    });
});

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc';
};

const goToList = () => router.push('/board');
const goToWrite = () => router.push('/board/write');
const goToDetail = (id) => {
    const target = posts.value.find(p => p.id === id);
    if (target) {
        target.views++;
    }
    router.push(`/board/${id}`);
};
const goToEdit = (id) => router.push(`/board/${id}/edit`);

const savePost = () => {
    if (!form.value.title.trim()) return alert('제목을 입력하세요.');
    if (!form.value.content.trim()) return alert('내용을 입력하세요.');

    if (isEditing.value) {
        currentPost.value.title = form.value.title;
        currentPost.value.author = form.value.author || '관리자';
        currentPost.value.content = form.value.content;
        router.push(`/board/${currentPost.value.id}`);
    } else {
        const today = new Date().toISOString().slice(0, 10);
        const newId = posts.value.length > 0 ? Math.max(...posts.value.map(p => p.id)) + 1 : 1;
        
        posts.value.unshift({
            id: newId,
            title: form.value.title,
            author: form.value.author || '관리자',
            date: today,
            views: 0,
            content: form.value.content
        });
        router.push('/board');
    }
};

const deletePost = (id) => {
    if (confirm('해당 게시글을 삭제하시겠습니까?')) {
        posts.value = posts.value.filter(p => p.id !== id);
        router.push('/board');
    }
};

const cancelForm = () => {
    if (isEditing.value) {
        router.push(`/board/${currentPost.value.id}`);
    } else {
        router.push('/board');
    }
};
</script>

<style lang="scss" scoped>
/* SCSS 공통 변수 정의 */
$main-color: #4859a6;
$title-color: #3d4d92;
$outline-color: #e2e8f0;

.board-page {
  width: 100%;
}

.boardList {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #fff;
    padding: 20px 0 60px;
    border: 1px solid #E7EAF0;
    border-radius: 10px;
    box-sizing: border-box;

    .writeBtn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        background: $main-color;
        color: #fff;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: $title-color;
            color: #fff;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;

        h2 {
            font-size: 24px;
            font-weight: 700;
            color: #111;
            margin: 0;
        }

        .boardList__actions {
            display: flex;
            align-items: center;
            gap: 10px;

            .sortBtn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                border: 1px solid #ccc;
                border-radius: 6px;
                background: #fff;
                font-size: 14px;
                color: #555;
                cursor: pointer;

                &:hover {
                background: #f5f5f5;
                }
            }
        }
    }

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 100px 0;
        background: #fff;

        p {
            color: #888;
            font-size: 15px;
            margin: 0;
        }

        .first-write-btn {
            background: $main-color;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color: $title-color;
            }
        }
    }

    &__table {
        width: 100%;
        text-align: center;
        border-collapse: separate;
        border-spacing: 0;
        background: #fff;
        overflow: hidden;
        border-top: 1px solid #E7EAF0;
        border-bottom: 1px solid #E7EAF0;

        th, td {
            border-bottom: 1px solid #E7EAF0;
            padding: 14px 12px;
            font-size: 14px;
        }

        tbody tr {
            cursor: pointer;
            &:hover {
                background: #fafbfd;
            }
            &:last-child td {
                border-bottom: none;
            }
        }

        thead {
            background: #F5F9FC;

            th {
                font-weight: 600;
                color: #1e293b;
            }
        }

        td {
            color: #828282;

            &.title-cell {
                color: #333333;
            }
        }

        .col-no { width: 10%; }
        .col-title { width: 45%; }
        .col-author { width: 15%; }
        .col-date { width: 18%; }
        .col-views { width: 12%; }
    }
}

.boardDetail {
    width: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    padding: 30px;
    border: 1px solid #E7EAF0;
    border-radius: 10px;
    box-sizing: border-box;

    &__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 12px;

        h2 {
        font-size: 24px;
        font-weight: 700;
        color: #111;
        margin: 0;
        }

        .meta {
            width: 100%;
            display: flex;
            gap: 14px;
            color: #555;
            padding-bottom: 12px;
            border-bottom: 1px solid $outline-color;

            span {
                font-size: 14px;
            }
        }
    }

    &__content {
        width: 100%;
        flex: 1;
        padding: 24px 0;
        text-indent: 10px;
        font-size: 15px;
        line-height: 1.6;
        color: #222;
        white-space: pre-wrap;
    }

    &__actions {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button {
            font-size: 14px;
            padding: 8px 18px;
            border-radius: 5px;
            cursor: pointer;

            &:nth-child(1) {
                background: #fff;
                border: 1px solid #ccc;
                color: #333;
                &:hover {
                background: #f5f5f5;
                }
            }

            &.btn-edit-action {
                background: #fff;
                border: 1px solid #ccc;
                color: #333;
                &:hover {
                background: #f5f5f5;
                }
            }

            &:last-child {
                background: #CE0000;
                color: #fff;
                border: none;
                &:hover {
                background: #b00000;
                }
            }
        }
    }
}

.boardWrite {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: #fff;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;

    h2 {
        font-size: 24px;
        font-weight: 700;
        color: #111;
        margin: 0;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        input, textarea {
            border: 1px solid $outline-color;
            border-radius: 4px;
            padding: 10px 12px;
            font-size: 14px;
            font-family: inherit;
            outline: none;

            &:focus {
                border-color: $main-color;
            }
        }

        textarea {
            resize: vertical;
        }
    }

    &__input {
        display: flex;
        gap: 12px;

        input {
            &:nth-child(1) {
                flex: 3;
            }
            &:nth-child(2) {
                flex: 1;
            }
        }
    }

    &__actions {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button {
            font-size: 14px;
            padding: 8px 22px;
            border-radius: 5px;
            cursor: pointer;

            &[type="submit"] {
                background: $main-color;
                color: #fff;
                border: none;
                &:hover {
                background: $title-color;
                }
            }

            &[type="button"] {
                background: #ccc;
                color: #fff;
                border: none;
                &:hover {
                background: #b5b5b5;
                }
            }
        }
    }
}
</style>