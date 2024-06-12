import { UpdateInvoice, DeleteInvoice } from '@/app/ui/games/buttons';
import { fetchFilteredGames } from '@/app/lib/data';
import { GameTable } from '@/app/lib/definitions';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const games = await fetchFilteredGames(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {games?.map((game: GameTable) => (
              <div
                key={game.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="grid grid-cols-2 gap 6">
                        <p>{game.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{game.release_year}</p>
                  </div>
                  <p className="text-sm text-gray-500">{game.platform}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div />
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={game.id} />
                    <DeleteInvoice id={game.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Game
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Release Year
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Platform
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {games?.map((game: GameTable) => (
                <tr
                  key={game.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{game.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{game.release_year}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{game.platform}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={game.id} />
                      <DeleteInvoice id={game.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
