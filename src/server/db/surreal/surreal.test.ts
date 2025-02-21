import { Firebase } from "@server";

async function main() {
    let db = (await Firebase());
    let app = await db.get();
    console.log(app);
}

main();