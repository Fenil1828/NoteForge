// import { CreateNotebookButton } from "@/components/create-notebook-button";
import { CreateNotebookButton } from "@/components/create-notebook-button";
import NotebookCard from "@/components/notebook-card";
import PageWrapper from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";

export default async function Page() {
    const notebooks = await getNotebooks()
    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
            <h1>Notebooks</h1>
            <CreateNotebookButton />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notebooks.success && notebooks?.notebooks?.map((notebook) => (
                <NotebookCard key={notebook.id} notebook={notebook} />
            ))}
            </div>

            {notebooks.success && notebooks?.notebooks?.length === 0 && (
                <div>
                    <p>No notebooks found.</p>
                </div>
            )}


           


        </PageWrapper>
    )
}
