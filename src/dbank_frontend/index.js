
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as dbank_idl, canisterId as dbank_id } from "../declarations/dbank_backend";


let dbank; // cached actor

async function getDBank() {
  if (dbank) return dbank;

  const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
  // Always fetch the dev root key when talking to local replica
  await agent.fetchRootKey();

  dbank = Actor.createActor(dbank_idl, { agent, canisterId: dbank_id });
  return dbank;
}

function onDomReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else fn();
}

async function refreshBalance() {
  const el = document.getElementById("value");
  if (!el) return;

  try {
    const actor = await getDBank();
    const raw = await actor.checkBalance();      // Float -> number
    const n = Number((Math.round(raw * 100)) / 100);
    el.textContent = (n.toLocaleString(undefined, {}));
    console.log("[DBank] balance OK:", n);
  } catch (e) {
    console.error("[DBank] checkBalance failed:", e);
    el.textContent = "—";
  }
}

onDomReady(refreshBalance);


document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");
    
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0){
        const actor = await getDBank();
        await actor.deposit(inputAmount);
        document.getElementById("input-amount").value = "";
    }

    if (document.getElementById("withdrawal-amount").value.length != 0){
        const actor = await getDBank();
        await actor.withdraw(outputAmount);
        document.getElementById("withdrawal-amount").value = "";
    }

    const actor = await getDBank();
    await actor.compound();

    await refreshBalance();
    button.removeAttribute("disabled");

});

