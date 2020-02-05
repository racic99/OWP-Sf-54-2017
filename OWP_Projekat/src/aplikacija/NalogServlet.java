package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.KorisnikDAO;
import model.Korisnik;

public class NalogServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.get(prijavljenKorisnikKorime);

		String korime = request.getParameter("korime");
		
		if(prijavljenKorisnik.getUloga().name().equals("KORISNIK") && !(prijavljenKorisnik.getKorime().equals(korime))) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}

		Korisnik korisnik = KorisnikDAO.get(korime);
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("korisnik", korisnik);
		data.put("ulogaPrijavljenogKorisnika", prijavljenKorisnik.getUloga());
		data.put("prijavljenKorisnik", prijavljenKorisnik);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
