
"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  ChevronDown,
  Superscript,
  Subscript,
  MoreHorizontal,
  Type,
} from "lucide-react";
import { updateNote } from "@/server/notes";
import { cn } from "@/lib/utils";

interface MobileRichTextEditorProps {
  content?: JSONContent[];
  noteId?: string;
  className?: string;
}

const MobileRichTextEditor = ({ 
  content, 
  noteId, 
  className 
}: MobileRichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      if (noteId) {
        const content = editor.getJSON();
        updateNote(noteId, { content });
      }
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            {
              type: "text",
              text: "Mobile Editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " template! This template is fully responsive and " },
            { type: "text", text: "mobile-optimized", marks: [{ type: "bold" }] },
            { type: "text", text: " for the best editing experience on any device." },
          ],
        },
      ],
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1";
    if (editorState?.isHeading2) return "H2";
    if (editorState?.isHeading3) return "H3";
    return "Text";
  };

  // Mobile toolbar component
  const MobileToolbar = () => (
    <div className="flex items-center gap-1 p-2 bg-muted/50 border-b overflow-x-auto scrollbar-hide">
      {/* Essential formatting buttons - always visible */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className="h-9 w-9 p-0 touch-manipulation"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className="h-9 w-9 p-0 touch-manipulation"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 shrink-0" />

        {/* Text Style Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 gap-1 touch-manipulation shrink-0"
            >
              <Type className="h-4 w-4" />
              {getActiveHeading()}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <span className="text-2xl font-bold">H1</span>
              <span className="ml-2">Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <span className="text-xl font-bold">H2</span>
              <span className="ml-2">Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <span className="text-lg font-bold">H3</span>
              <span className="ml-2">Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().setParagraph().run()}
            >
              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Format Buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          className={cn(
            "h-9 w-9 p-0 touch-manipulation shrink-0",
            editorState?.isBold && "bg-accent text-accent-foreground"
          )}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          className={cn(
            "h-9 w-9 p-0 touch-manipulation shrink-0",
            editorState?.isItalic && "bg-accent text-accent-foreground"
          )}
        >
          <Italic className="h-4 w-4" />
        </Button>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-9 w-9 p-0 touch-manipulation shrink-0",
            editorState?.isBulletList && "bg-accent text-accent-foreground"
          )}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-9 w-9 p-0 touch-manipulation shrink-0",
            editorState?.isOrderedList && "bg-accent text-accent-foreground"
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      {/* More Options Sheet for Mobile */}
      <div className="flex items-center shrink-0 ml-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 touch-manipulation"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh]">
            <SheetHeader>
              <SheetTitle>Formatting Options</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {/* Text Formatting */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Text</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    disabled={!editorState?.canStrike}
                    className={cn(
                      "h-12 touch-manipulation",
                      editorState?.isStrike && "bg-accent"
                    )}
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    disabled={!editorState?.canCode}
                    className={cn(
                      "h-12 touch-manipulation",
                      editorState?.isCode && "bg-accent"
                    )}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Scripts */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Scripts</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <Superscript className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <Subscript className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Alignment */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Align</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 touch-manipulation"
                  >
                    <AlignJustify className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Insert */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Insert</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-12 w-full touch-manipulation"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  // Desktop toolbar component
  const DesktopToolbar = () => (
    <div className="flex items-center gap-1 p-2 bg-muted/50 border-b">
      {/* Undo/Redo */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editorState?.canUndo}
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editorState?.canRedo}
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Redo className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Heading Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
          >
            {getActiveHeading()}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover border">
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setParagraph().run()}
          >
            Paragraph
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lists */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isBulletList
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isOrderedList
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Text Formatting */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editorState?.canBold}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isBold
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editorState?.canItalic}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isItalic
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editorState?.canStrike}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isStrike
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editorState?.canCode}
        className={`size-8 p-0 hover:bg-accent ${
          editorState?.isCode
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Additional Tools */}
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Superscript className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <Subscript className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Alignment */}
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add Button */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
      >
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </div>
  );

  return (
    <div className={cn(
      "w-full bg-card text-card-foreground rounded-lg overflow-hidden border",
      "max-w-full", // Ensure it doesn't overflow on mobile
      className
    )}>
      {/* Responsive Toolbar */}
      <div className="hidden md:block">
        <DesktopToolbar />
      </div>
      <div className="block md:hidden">
        <MobileToolbar />
      </div>

      {/* Editor Content */}
      <div className="min-h-[24rem] md:min-h-96 p-4 md:p-6 bg-card">
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-neutral dark:prose-invert max-w-none focus:outline-none",
            "[&_.ProseMirror]:focus:outline-none",
            "[&_.ProseMirror]:min-h-[20rem] md:[&_.ProseMirror]:min-h-96",
            // Mobile-optimized typography
            "[&_.ProseMirror_h1]:text-2xl md:[&_.ProseMirror_h1]:text-3xl",
            "[&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-3 md:[&_.ProseMirror_h1]:mb-4",
            "[&_.ProseMirror_h2]:text-xl md:[&_.ProseMirror_h2]:text-2xl",
            "[&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-2 md:[&_.ProseMirror_h2]:mb-3",
            "[&_.ProseMirror_h3]:text-lg md:[&_.ProseMirror_h3]:text-xl",
            "[&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2",
            "[&_.ProseMirror_p]:mb-3 md:[&_.ProseMirror_p]:mb-4",
            "[&_.ProseMirror_p]:leading-relaxed md:[&_.ProseMirror_p]:leading-normal",
            // Mobile-optimized blockquotes and code
            "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border",
            "[&_.ProseMirror_blockquote]:pl-3 md:[&_.ProseMirror_blockquote]:pl-4",
            "[&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-3 md:[&_.ProseMirror_blockquote]:my-4",
            "[&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3 md:[&_.ProseMirror_pre]:p-4",
            "[&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto",
            "[&_.ProseMirror_pre]:text-sm md:[&_.ProseMirror_pre]:text-base",
            "[&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1",
            "[&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm",
            // Mobile-optimized lists
            "[&_.ProseMirror_ul]:pl-4 md:[&_.ProseMirror_ul]:pl-6",
            "[&_.ProseMirror_ol]:pl-4 md:[&_.ProseMirror_ol]:pl-6",
            "[&_.ProseMirror_li]:mb-1 md:[&_.ProseMirror_li]:mb-2"
          )}
        />
      </div>
    </div>
  );
};

export default MobileRichTextEditor;
